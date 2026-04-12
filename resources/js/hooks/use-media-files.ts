import { useCallback, useEffect, useState } from 'react';
import type { MediaFileResource } from '@/types';
import * as MediaController from '@/actions/App/Http/Controllers/Admin/MediaController';

const getCsrfToken = (): string => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

const CHUNK_SIZE = 512 * 1024; // 512KB per chunk
const CHUNK_THRESHOLD = 1 * 1024 * 1024; // file > 1MB pakai chunk upload

/**
 * Mengambil semua gambar dari seluruh public storage.
 * Upload tetap diarahkan ke `uploadFolder` sesuai konteks form.
 * File > 1.5MB di-upload menggunakan chunk upload.
 */
const useMediaFiles = (uploadFolder: string, enabled: boolean) => {
    const [files, setFiles] = useState<MediaFileResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fetchFiles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(MediaController.listFiles.url(), {
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                const json = await res.json();
                setFiles(json.data ?? []);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        fetchFiles();
    }, [enabled, fetchFiles]);

    /** Upload biasa untuk file kecil (<= 1.5MB) */
    const uploadDirect = async (file: File): Promise<void> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', uploadFolder);

        const res = await fetch(MediaController.store.url(), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-XSRF-TOKEN': getCsrfToken(),
            },
            body: formData,
        });

        if (res.ok) {
            const json = await res.json();
            setFiles((prev) => [
                {
                    name: file.name,
                    path: json.path,
                    url: json.url,
                    size: file.size,
                    last_modified: new Date().toISOString(),
                },
                ...prev,
            ]);
        }
    };

    /** Chunk upload untuk file besar (> 1.5MB) */
    const uploadChunked = async (file: File): Promise<void> => {
        const uploadId = crypto.randomUUID();
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const csrfToken = getCsrfToken();

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('upload_id', uploadId);
            formData.append('chunk_index', String(i));
            formData.append('total_chunks', String(totalChunks));
            formData.append('folder', uploadFolder);
            formData.append('original_name', file.name);
            formData.append('chunk', chunk, `${file.name}.part${i}`);

            const res = await fetch(MediaController.uploadChunk.url(), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json().catch(() => null);
                throw new Error(
                    error?.message ??
                        `Gagal mengupload chunk ${i + 1}/${totalChunks}`,
                );
            }

            setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));

            // Chunk terakhir mengembalikan data file final
            if (i === totalChunks - 1) {
                const json = await res.json();
                setFiles((prev) => [
                    {
                        name: file.name,
                        path: json.path,
                        url: json.url,
                        size: file.size,
                        last_modified: new Date().toISOString(),
                    },
                    ...prev,
                ]);
            }
        }
    };

    const upload = useCallback(
        async (file: File): Promise<void> => {
            setUploading(true);
            setUploadProgress(0);
            try {
                if (file.size > CHUNK_THRESHOLD) {
                    await uploadChunked(file);
                } else {
                    await uploadDirect(file);
                    setUploadProgress(100);
                }
            } finally {
                setUploading(false);
                setUploadProgress(0);
            }
        },
        [uploadFolder],
    );

    return { files, loading, uploading, uploadProgress, upload };
};

export { useMediaFiles };
