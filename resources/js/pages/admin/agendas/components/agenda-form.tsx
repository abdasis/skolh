import { type FormEventHandler } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { FormDatePicker, FormInput, FormTextarea, FormSubmit, parseLocalDate, formatLocalDate } from '@/components/form';

export interface AgendaFormData {
    date: string;
    title: string;
    description: string;
}

interface Props {
    form: InertiaFormProps<AgendaFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
}

export function AgendaForm({ form, onSubmit, submitLabel = 'Simpan' }: Props) {
    const { data, setData, errors, processing, recentlySuccessful } = form;

    const dateValue = data.date ? parseLocalDate(data.date) : undefined;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormDatePicker
                label="Tanggal"
                value={dateValue}
                onChange={(date) => setData('date', date ? formatLocalDate(date) : '')}
                placeholder="Pilih tanggal"
                error={errors.date}
                required
            />

            <FormInput
                label="Judul"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Judul agenda"
                error={errors.title}
                required
            />

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi agenda (opsional)"
                rows={4}
                error={errors.description}
            />

            <FormSubmit processing={processing} successful={recentlySuccessful}>
                {submitLabel}
            </FormSubmit>
        </form>
    );
}
