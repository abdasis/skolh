import { useCallback, useEffect, useRef, useState } from 'react';
import type { MediaFileResource } from '@/types';
import * as MediaController from '@/actions/App/Http/Controllers/Admin/MediaController';

const getCsrfToken = (): string => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

/**
 * Mengambil semua gambar dari seluruh public storage.
 * Upload tetap diarahkan ke `uploadFolder` sesuai konteks form.
 */
const useMediaFiles = (uploadFolder: string, enabled: boolean) => {
    const [files, setFiles] = useState<MediaFileResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fetchedRef = useRef(false);

    const fetchFiles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(MediaController.index.url(), {
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
        if (fetchedRef.current) {
            return;
        }
        fetchedRef.current = true;
        fetchFiles();
    }, [enabled, fetchFiles]);

    const upload = useCallback(async (file: File): Promise<void> => {
        setUploading(true);
        try {
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
                // tambahkan gambar baru ke posisi paling depan (terbaru)
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
        } finally {
            setUploading(false);
        }
    }, [uploadFolder]);

    return { files, loading, uploading, upload };
};

export { useMediaFiles };
