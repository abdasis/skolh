import { useForm } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import * as ReportController from '@/actions/App/Http/Controllers/Admin/ReportController';
import { type Report, type ReportStatus } from '@/types';

const STATUS_VARIANT: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    new: 'default',
    in_progress: 'secondary',
    resolved: 'outline',
    rejected: 'destructive',
};

const TERMINAL_STATES: ReportStatus[] = ['resolved', 'rejected'];

interface Props {
    report: Report | null;
    open: boolean;
    onClose: () => void;
    statusOptions: { value: string; label: string }[];
}

const ReportDetailModal = ({ report, open, onClose, statusOptions }: Props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        status: '' as ReportStatus | '',
        note: '',
    });

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            reset();
            onClose();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!report) {
            return;
        }

        put(ReportController.update.url({ report: report.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!report) {
        return null;
    }

    const isTerminal = TERMINAL_STATES.includes(report.status);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-4xl min-w-4xl overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
            >
                <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                            <DialogTitle className="flex items-center gap-2">
                                <span className="truncate">
                                    {report.subject}
                                </span>
                                <Badge
                                    variant={
                                        STATUS_VARIANT[report.status] ??
                                        'secondary'
                                    }
                                    className="shrink-0"
                                >
                                    {report.status_label}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="font-mono text-xs">
                                {report.reference_code}
                            </DialogDescription>
                        </div>
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 shrink-0"
                            >
                                <XIcon className="size-4" />
                                <span className="sr-only">Tutup</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>

                    <div className="max-h-[70vh] overflow-y-auto">
                        <div className="space-y-5 p-5">
                            {/* Info laporan */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Kategori
                                    </p>
                                    <p className="font-medium">
                                        {report.category_label}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Tanggal Masuk
                                    </p>
                                    <p className="font-medium">
                                        {new Date(
                                            report.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                {report.reporter_name && (
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Nama Pelapor
                                        </p>
                                        <p className="font-medium">
                                            {report.reporter_name}
                                        </p>
                                    </div>
                                )}
                                {report.reporter_contact && (
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Kontak Pelapor
                                        </p>
                                        <p className="font-medium">
                                            {report.reporter_contact}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Isi laporan */}
                            <div>
                                <p className="mb-1.5 text-xs text-muted-foreground">
                                    Isi Laporan
                                </p>
                                <p className="text-sm whitespace-pre-wrap">
                                    {report.message}
                                </p>
                            </div>

                            {/* Riwayat status */}
                            {report.status_histories.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="mb-3 text-xs font-semibold text-muted-foreground">
                                            Riwayat Status
                                        </p>
                                        <div className="space-y-2">
                                            {report.status_histories.map(
                                                (history) => (
                                                    <div
                                                        key={history.id}
                                                        className="flex gap-3 text-sm"
                                                    >
                                                        <Badge
                                                            variant={
                                                                STATUS_VARIANT[
                                                                    history
                                                                        .status
                                                                ] ?? 'secondary'
                                                            }
                                                            className="mt-0.5 shrink-0 text-xs"
                                                        >
                                                            {
                                                                history.status_label
                                                            }
                                                        </Badge>
                                                        <div className="min-w-0 flex-1">
                                                            {history.note && (
                                                                <p className="text-sm">
                                                                    {
                                                                        history.note
                                                                    }
                                                                </p>
                                                            )}
                                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                                {
                                                                    history.changed_by_name
                                                                }{' '}
                                                                &middot;{' '}
                                                                {new Date(
                                                                    history.created_at,
                                                                ).toLocaleDateString(
                                                                    'id-ID',
                                                                    {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    },
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {!isTerminal && (
                                <>
                                    <Separator />

                                    {/* Form update status */}
                                    <div>
                                        <p className="mb-3 text-sm font-semibold">
                                            Perbarui Status
                                        </p>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-3"
                                        >
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                                                    Status Baru
                                                </label>
                                                <Select
                                                    value={data.status}
                                                    onValueChange={(val) =>
                                                        setData(
                                                            'status',
                                                            val as ReportStatus,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusOptions
                                                            .filter(
                                                                (opt) =>
                                                                    opt.value !==
                                                                    report.status,
                                                            )
                                                            .map((opt) => (
                                                                <SelectItem
                                                                    key={
                                                                        opt.value
                                                                    }
                                                                    value={
                                                                        opt.value
                                                                    }
                                                                >
                                                                    {opt.label}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.status && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.status}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                                                    Catatan (opsional)
                                                </label>
                                                <Textarea
                                                    value={data.note}
                                                    onChange={(e) =>
                                                        setData(
                                                            'note',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Tambahkan catatan tindak lanjut..."
                                                    rows={3}
                                                />
                                                {errors.note && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.note}
                                                    </p>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}

                            {isTerminal && (
                                <>
                                    <Separator />
                                    <p className="text-sm text-muted-foreground">
                                        Laporan sudah dalam status terminal (
                                        {report.status_label}) dan tidak dapat
                                        diubah lagi.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        {!isTerminal && (
                            <Button
                                type="submit"
                                disabled={processing || !data.status}
                                onClick={handleSubmit}
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>
                        )}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { ReportDetailModal };
