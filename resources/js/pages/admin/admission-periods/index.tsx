import { useState } from 'react';
import { Head, router, setLayoutProps, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/data-table';
import type { DataTableState } from '@/components/data-table';
import * as AdmissionPeriodController from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import { type AdmissionPeriod } from '@/types';
import { createAdmissionPeriodColumns } from './components/admission-period-columns';
import { PlusIcon, XIcon } from 'lucide-react';

interface PaginatedPeriods {
    data: AdmissionPeriod[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    periods: PaginatedPeriods;
    activePeriod: AdmissionPeriod | null;
}

type FormData = {
    academic_year: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    description: string;
};

const emptyForm: FormData = {
    academic_year: '',
    start_date: '',
    end_date: '',
    is_active: false,
    description: '',
};

const AdminAdmissionPeriodsIndex = ({ periods, activePeriod }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pengaturan SPMB', href: AdmissionPeriodController.index.url() },
        ],
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState<AdmissionPeriod | null>(null);

    const form = useForm<FormData>(emptyForm);

    const openCreate = () => {
        setEditingPeriod(null);
        form.setData(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (period: AdmissionPeriod) => {
        setEditingPeriod(period);
        form.setData({
            academic_year: period.academic_year,
            start_date: period.start_date,
            end_date: period.end_date,
            is_active: period.is_active,
            description: period.description ?? '',
        });
        setDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPeriod) {
            form.put(AdmissionPeriodController.update.url({ admission_period: editingPeriod.id }), {
                preserveScroll: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(AdmissionPeriodController.store.url(), {
                preserveScroll: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleStateChange = (state: DataTableState) => {
        const params: Record<string, unknown> = {
            search: state.globalFilter || undefined,
            per_page: state.pagination.pageSize,
            page: state.pagination.pageIndex + 1,
        };

        if (state.sorting.length > 0) {
            params.sort = state.sorting.map((s) => ({ id: s.id, desc: s.desc }));
        }

        router.get(
            AdmissionPeriodController.index.url(),
            params as Record<string, string | number | boolean | undefined>,
            { preserveState: true, replace: true },
        );
    };

    const columns = createAdmissionPeriodColumns(openEdit);

    return (
        <>
            <Head title="Pengaturan SPMB" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Pengaturan SPMB</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola periode penerimaan murid baru dan konfigurasi formulir pendaftaran.
                        </p>
                    </div>
                    <Button onClick={openCreate}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Tambah Periode
                    </Button>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={periods.data}
                        mode="server"
                        totalRows={periods.meta.total}
                        searchPlaceholder="Cari tahun ajaran atau keterangan..."
                        onStateChange={handleStateChange}
                    />
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>
                                    {editingPeriod ? 'Edit Periode' : 'Tambah Periode Baru'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingPeriod
                                        ? `Mengedit periode ${editingPeriod.academic_year}`
                                        : 'Buat periode penerimaan murid baru'}
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Tutup</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            <div className="max-h-[70vh] overflow-y-auto">
                                <div className="space-y-4 p-5">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="academic_year">Tahun Ajaran</Label>
                                        <Input
                                            id="academic_year"
                                            placeholder="contoh: 2026/2027"
                                            value={form.data.academic_year}
                                            onChange={(e) => form.setData('academic_year', e.target.value)}
                                        />
                                        {form.errors.academic_year && (
                                            <p className="text-sm text-destructive">{form.errors.academic_year}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="start_date">Tanggal Buka</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                value={form.data.start_date}
                                                onChange={(e) => form.setData('start_date', e.target.value)}
                                            />
                                            {form.errors.start_date && (
                                                <p className="text-sm text-destructive">{form.errors.start_date}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="end_date">Tanggal Tutup</Label>
                                            <Input
                                                id="end_date"
                                                type="date"
                                                value={form.data.end_date}
                                                onChange={(e) => form.setData('end_date', e.target.value)}
                                            />
                                            {form.errors.end_date && (
                                                <p className="text-sm text-destructive">{form.errors.end_date}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-foreground/8 bg-muted/20 px-4 py-3">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_active" className="text-sm font-medium">
                                                Aktifkan Periode
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Hanya satu periode yang bisa aktif sekaligus
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_active"
                                            checked={form.data.is_active}
                                            onCheckedChange={(val) => form.setData('is_active', val)}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="description">Keterangan (opsional)</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Informasi tambahan tentang periode ini..."
                                            rows={3}
                                            value={form.data.description}
                                            onChange={(e) => form.setData('description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={form.processing}>
                                    {editingPeriod ? 'Simpan Perubahan' : 'Tambah Periode'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminAdmissionPeriodsIndex;
