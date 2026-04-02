import { type InertiaFormProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Link } from '@inertiajs/react';

interface EnumOption {
    value: string;
    label: string;
}

export interface AchievementFormData {
    _method?: string;
    title: string;
    description: string;
    category: string;
    level: string;
    year: number | string;
    attachment: File | null;
}

interface Props {
    form: InertiaFormProps<AchievementFormData>;
    url: string;
    cancelUrl: string;
    categories: EnumOption[];
    levels: EnumOption[];
    submitLabel: string;
    currentAttachment?: string | null;
}

const AchievementForm = ({
    form,
    url,
    cancelUrl,
    categories,
    levels,
    submitLabel,
    currentAttachment,
}: Props) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(url, {
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Judul</Label>
                <Input
                    id="title"
                    value={form.data.title}
                    onChange={(e) => form.setData('title', e.target.value)}
                    placeholder="Judul prestasi"
                />
                {form.errors.title && (
                    <p className="text-xs text-destructive">{form.errors.title}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                    id="description"
                    value={form.data.description}
                    onChange={(e) => form.setData('description', e.target.value)}
                    placeholder="Deskripsi prestasi"
                    rows={4}
                />
                {form.errors.description && (
                    <p className="text-xs text-destructive">{form.errors.description}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                        value={form.data.category}
                        onValueChange={(val) => form.setData('category', val)}
                    >
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {form.errors.category && (
                        <p className="text-xs text-destructive">{form.errors.category}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="level">Tingkat</Label>
                    <Select
                        value={form.data.level}
                        onValueChange={(val) => form.setData('level', val)}
                    >
                        <SelectTrigger id="level">
                            <SelectValue placeholder="Pilih tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                            {levels.map((lvl) => (
                                <SelectItem key={lvl.value} value={lvl.value}>
                                    {lvl.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {form.errors.level && (
                        <p className="text-xs text-destructive">{form.errors.level}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="year">Tahun</Label>
                <Input
                    id="year"
                    type="number"
                    value={form.data.year}
                    onChange={(e) => form.setData('year', e.target.value)}
                    placeholder="2024"
                    min={1900}
                    max={new Date().getFullYear() + 1}
                />
                {form.errors.year && (
                    <p className="text-xs text-destructive">{form.errors.year}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="attachment">Lampiran</Label>
                {currentAttachment && (
                    <p className="text-xs text-muted-foreground">
                        File saat ini:{' '}
                        <a
                            href={currentAttachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            Lihat lampiran
                        </a>
                    </p>
                )}
                <Input
                    id="attachment"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={(e) =>
                        form.setData('attachment', e.target.files?.[0] ?? null)
                    }
                />
                {form.errors.attachment && (
                    <p className="text-xs text-destructive">{form.errors.attachment}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
                <Button variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
                </Button>
            </div>
        </form>
    );
};

export { AchievementForm };
