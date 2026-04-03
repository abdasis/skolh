import { useState } from 'react';
import { Head, router, setLayoutProps, useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormSelect } from '@/components/form';
import * as RegistrationController from '@/actions/App/Http/Controllers/Admin/RegistrationController';
import RegistrationDetailView from './components/registration-detail-view';
import { type RegistrationDetail } from '@/types';
import { Download, XIcon } from 'lucide-react';

interface Props {
    registration: RegistrationDetail;
    statusOptions: { value: string; label: string }[];
}

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    pending: 'secondary',
    verified: 'default',
    accepted: 'default',
    rejected: 'destructive',
};

const STATUS_COLORS: Record<string, string> = {
    pending: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30',
    verified: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30',
    accepted: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30',
    rejected: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30',
};

const AdminRegistrationShow = ({ registration, statusOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Data Pendaftaran', href: RegistrationController.index.url() },
            { title: registration.registration_number },
        ],
    });

    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, patch, processing } = useForm({
        status: registration.status,
    });

    const pendingLabel = statusOptions.find(s => s.value === data.status)?.label ?? data.status;
    const currentLabel = statusOptions.find(s => s.value === registration.status)?.label ?? registration.status;
    const isDirty = data.status !== registration.status;

    const handleConfirmUpdate = () => {
        patch(RegistrationController.updateStatus.url({ registration: registration.id }), {
            preserveScroll: true,
            onSuccess: () => setConfirmOpen(false),
        });
    };

    const handleDownloadPdf = () => {
        window.location.href = RegistrationController.downloadPdf.url({ registration: registration.id });
    };

    return (
        <>
            <Head title={`Pendaftaran ${registration.registration_number}`} />

            <div className="flex flex-col gap-4 p-2">
                {/* Header */}
                <div className="flex items-start justify-between px-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-mono text-xl font-semibold">{registration.registration_number}</h1>
                            <Badge variant={STATUS_VARIANTS[registration.status] ?? 'outline'}>
                                {currentLabel}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {registration.full_name} &bull; {registration.admission_period?.academic_year}
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleDownloadPdf}>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh PDF
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-3">
                    {/* Detail Pendaftaran */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Detail Pendaftaran</p>
                                    <p className="text-xs text-muted-foreground">Data lengkap formulir pendaftaran</p>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="p-5">
                                    <RegistrationDetailView registration={registration} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel Aksi */}
                    <div className="flex flex-col gap-4">
                        {/* Ubah Status */}
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="px-5 py-4">
                                <p className="text-sm font-medium">Ubah Status</p>
                                <p className="text-xs text-muted-foreground">Perbarui status pendaftaran</p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="space-y-3 p-5">
                                    {/* Status saat ini */}
                                    <div className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${STATUS_COLORS[registration.status] ?? ''}`}>
                                        <span className="text-xs text-muted-foreground">Status saat ini</span>
                                        <Badge variant={STATUS_VARIANTS[registration.status] ?? 'outline'}>
                                            {currentLabel}
                                        </Badge>
                                    </div>

                                    <FormSelect
                                        label="Status baru"
                                        value={data.status}
                                        onValueChange={val => setData('status', val as typeof data.status)}
                                        options={statusOptions}
                                        placeholder="Pilih status..."
                                    />

                                    <Button
                                        className="w-full"
                                        disabled={!isDirty || processing}
                                        onClick={() => setConfirmOpen(true)}
                                    >
                                        {isDirty ? `Ubah ke "${pendingLabel}"` : 'Tidak ada perubahan'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Pas Foto */}
                        {registration.photo_url && (
                            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                                <div className="px-5 py-4">
                                    <p className="text-sm font-medium">Pas Foto</p>
                                </div>
                                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                    <div className="p-4">
                                        <img
                                            src={registration.photo_url}
                                            alt={`Foto ${registration.full_name}`}
                                            className="max-h-48 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-md overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
                                <DialogDescription>
                                    Pastikan perubahan sudah benar sebelum disimpan.
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Tutup</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <div className="p-5">
                            <div className="space-y-3 rounded-lg border border-foreground/8 bg-muted/20 p-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Pendaftar</span>
                                    <span className="font-medium">{registration.full_name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Dari</span>
                                    <Badge variant={STATUS_VARIANTS[registration.status] ?? 'outline'}>
                                        {currentLabel}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Menjadi</span>
                                    <Badge variant={STATUS_VARIANTS[data.status] ?? 'outline'}>
                                        {pendingLabel}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button onClick={handleConfirmUpdate} disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Ya, Ubah Status'}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminRegistrationShow;
