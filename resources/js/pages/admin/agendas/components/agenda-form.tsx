import { type FormEventHandler } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
    const { data, setData, errors, processing } = form;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                />
                {errors.date && (
                    <p className="text-sm text-destructive">{errors.date}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Judul</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Judul agenda"
                />
                {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Deskripsi agenda (opsional)"
                    rows={4}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                )}
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
