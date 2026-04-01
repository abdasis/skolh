import { useRef, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    FormIconPicker,
    FormInput,
    FormTextarea,
    FormSelect,
    FormLabel,
    type SelectOption,
} from '@/components/form';
import { TiptapEditor } from '@/components/tiptap-editor';
import InputError from '@/components/ui/input-error';
import { type CurriculumResource } from '@/types';

export interface CurriculumFormData {
    name: string;
    code: string;
    year: string;
    level: string;
    description: string;
    content: string;
    icon: string;
    status: string;
    effective_date: string;
    expired_date: string;
    document: File | null;
    _method?: string;
}

interface CurriculumFormProps {
    action: string;
    method: 'post' | 'put';
    curriculum?: CurriculumResource;
    onProcessingChange?: (processing: boolean) => void;
}

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Aktif' },
];

const CurriculumForm = ({
    action,
    method,
    curriculum,
    onProcessingChange,
}: CurriculumFormProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, processing, errors, post } =
        useForm<CurriculumFormData>({
            name: curriculum?.name ?? '',
            code: curriculum?.code ?? '',
            year: curriculum?.year?.toString() ?? '',
            level: curriculum?.level ?? '',
            description: curriculum?.description ?? '',
            content: curriculum?.content ?? '',
            icon: curriculum?.icon ?? '',
            status: curriculum?.status ?? 'draft',
            effective_date: curriculum?.effective_date ?? '',
            expired_date: curriculum?.expired_date ?? '',
            document: null,
            ...(method === 'put' ? { _method: 'PUT' } : {}),
        });

    useEffect(() => {
        onProcessingChange?.(processing);
    }, [processing]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(action, {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <form
            id="curriculum-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            encType="multipart/form-data"
        >
            <FormIconPicker
                label="Icon"
                value={data.icon}
                onChange={(value) => setData('icon', value)}
                error={errors.icon}
                required
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                    label="Nama Kurikulum"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama kurikulum"
                    error={errors.name}
                    required
                />

                <FormInput
                    label="Kode"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    placeholder="Contoh: K13, KTSP"
                    error={errors.code}
                    required
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                    label="Tahun"
                    type="number"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                    placeholder="Contoh: 2024"
                    error={errors.year}
                    required
                />

                <FormInput
                    label="Jenjang"
                    value={data.level}
                    onChange={(e) => setData('level', e.target.value)}
                    placeholder="Contoh: SMP, Kelas 7"
                    error={errors.level}
                    required
                />
            </div>

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat kurikulum"
                rows={3}
                error={errors.description}
                required
            />

            <TiptapEditor
                label="Konten"
                content={data.content}
                onChange={(html) => setData('content', html)}
                error={errors.content}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                    label="Tanggal Berlaku"
                    type="date"
                    value={data.effective_date}
                    onChange={(e) => setData('effective_date', e.target.value)}
                    error={errors.effective_date}
                    required
                />

                <FormInput
                    label="Tanggal Berakhir"
                    type="date"
                    value={data.expired_date}
                    onChange={(e) => setData('expired_date', e.target.value)}
                    error={errors.expired_date}
                />
            </div>

            <FormSelect
                label="Status"
                value={data.status}
                onValueChange={(value) => setData('status', value)}
                options={statusOptions}
                placeholder="Pilih status"
                error={errors.status}
                required
            />

            <div className="grid gap-2">
                <FormLabel htmlFor="document">Dokumen Kurikulum</FormLabel>
                <input
                    ref={fileInputRef}
                    id="document"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                        setData('document', e.target.files?.[0] ?? null)
                    }
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                {curriculum?.document_url && !data.document && (
                    <p className="text-xs text-muted-foreground">
                        Dokumen saat ini:{' '}
                        <a
                            href={curriculum.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                        >
                            Lihat dokumen
                        </a>{' '}
                        (kosongkan untuk tetap menggunakan dokumen ini)
                    </p>
                )}
                <InputError message={errors.document} />
            </div>
        </form>
    );
};

export { CurriculumForm };
