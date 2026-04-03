import { Head, Link, useForm, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as CustomFieldController from '@/actions/App/Http/Controllers/Admin/CustomFieldController';
import * as AdmissionPeriodController from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import { type AdmissionPeriod } from '@/types';

interface FieldTypeOption {
    value: string;
    label: string;
}

interface Props {
    activePeriod: AdmissionPeriod;
    fieldTypes: FieldTypeOption[];
}

const AdminCustomFieldCreate = ({ activePeriod, fieldTypes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pengaturan SPMB', href: AdmissionPeriodController.index.url() },
            { title: 'Custom Fields', href: CustomFieldController.index.url() },
            { title: 'Tambah Field' },
        ],
    });

    const { data, setData, post, processing, errors } = useForm({
        admission_period_id: activePeriod.id,
        label: '',
        type: 'text',
        placeholder: '',
        is_required: false,
        sort_order: 0,
        options: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(CustomFieldController.store.url());
    };

    const handleAddOption = () => {
        setData('options', [...data.options, '']);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updated = [...data.options];
        updated[index] = value;
        setData('options', updated);
    };

    const handleRemoveOption = (index: number) => {
        setData('options', data.options.filter((_, i) => i !== index));
    };

    return (
        <>
            <Head title="Tambah Field Baru" />

            <div className="flex flex-col gap-6 p-2">
                <div className="px-2">
                    <h1 className="text-xl font-semibold">Tambah Field Baru</h1>
                    <p className="text-sm text-muted-foreground">
                        Menambahkan field untuk periode {activePeriod.academic_year}
                    </p>
                </div>

                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Detail Field</CardTitle>
                        <CardDescription>Konfigurasi field tambahan untuk formulir pendaftaran</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="label">Label Field</Label>
                                <Input
                                    id="label"
                                    placeholder="contoh: Jalur Pendaftaran"
                                    value={data.label}
                                    onChange={e => setData('label', e.target.value)}
                                />
                                {errors.label && <p className="text-sm text-destructive">{errors.label}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="type">Tipe Field</Label>
                                <Select value={data.type} onValueChange={val => setData('type', val)}>
                                    <SelectTrigger id="type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fieldTypes.map(ft => (
                                            <SelectItem key={ft.value} value={ft.value}>
                                                {ft.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="placeholder">Placeholder (opsional)</Label>
                                <Input
                                    id="placeholder"
                                    placeholder="Teks bantuan di dalam input..."
                                    value={data.placeholder}
                                    onChange={e => setData('placeholder', e.target.value)}
                                />
                            </div>

                            {data.type === 'select' && (
                                <div className="space-y-2">
                                    <Label>Opsi Pilihan</Label>
                                    {data.options.map((opt, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                value={opt}
                                                placeholder={`Opsi ${i + 1}`}
                                                onChange={e => handleOptionChange(i, e.target.value)}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveOption(i)}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={handleAddOption}>
                                        + Tambah Opsi
                                    </Button>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <Label htmlFor="is_required">Wajib Diisi</Label>
                                <Switch
                                    id="is_required"
                                    checked={data.is_required}
                                    onCheckedChange={val => setData('is_required', val)}
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    Tambah Field
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={CustomFieldController.index.url()}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default AdminCustomFieldCreate;
