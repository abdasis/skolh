import { Head, router, setLayoutProps, useForm } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import * as ReportController from '@/actions/App/Http/Controllers/Admin/ReportController';
import { type Report, type ReportStatus } from '@/types';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    new: 'default',
    in_progress: 'secondary',
    resolved: 'outline',
    rejected: 'destructive',
};

const TERMINAL_STATES: ReportStatus[] = ['resolved', 'rejected'];

interface Props {
    report: Report;
    statusOptions: { value: string; label: string }[];
}

const AdminReportShow = ({ report, statusOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Laporan', href: ReportController.index.url() },
            {
                title: report.reference_code,
                href: ReportController.show.url({ report: report.id }),
            },
        ],
    });

    const isTerminal = TERMINAL_STATES.includes(report.status);

    const { data, setData, put, processing, errors } = useForm({
        status: '' as ReportStatus | '',
        note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(ReportController.update.url({ report: report.id }), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Laporan: ${report.reference_code}`} />

            <div className="flex flex-col gap-6 p-4 max-w-3xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-semibold">{report.subject}</h1>
                            <Badge variant={STATUS_VARIANT[report.status] ?? 'secondary'}>
                                {report.status_label}
                            </Badge>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {report.reference_code}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.visit(ReportController.index.url())}
                    >
                        Kembali
                    </Button>
                </div>

                <div className="rounded-xl border bg-card p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Kategori</p>
                            <p className="font-medium">{report.category_label}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Tanggal Masuk</p>
                            <p className="font-medium">
                                {new Date(report.created_at).toLocaleDateString('id-ID', {
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
                                <p className="text-muted-foreground">Nama Pelapor</p>
                                <p className="font-medium">{report.reporter_name}</p>
                            </div>
                        )}
                        {report.reporter_contact && (
                            <div>
                                <p className="text-muted-foreground">Kontak Pelapor</p>
                                <p className="font-medium">{report.reporter_contact}</p>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Isi Laporan</p>
                        <p className="text-sm whitespace-pre-wrap">{report.message}</p>
                    </div>
                </div>

                {/* Status history timeline */}
                {report.status_histories.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold mb-3">Riwayat Status</h2>
                        <div className="space-y-3">
                            {report.status_histories.map((history) => (
                                <div
                                    key={history.id}
                                    className="flex gap-4 rounded-xl border bg-card p-4 text-sm"
                                >
                                    <div className="shrink-0 mt-0.5">
                                        <Badge
                                            variant={STATUS_VARIANT[history.status] ?? 'secondary'}
                                            className="text-xs"
                                        >
                                            {history.status_label}
                                        </Badge>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {history.note && (
                                            <p className="text-sm text-foreground">{history.note}</p>
                                        )}
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {history.changed_by_name} &middot;{' '}
                                            {new Date(history.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Status update form */}
                <div className="rounded-xl border bg-card p-6">
                    <h2 className="text-sm font-semibold mb-1">Perbarui Status</h2>
                    {isTerminal ? (
                        <p className="text-sm text-muted-foreground">
                            Laporan ini sudah dalam status terminal ({report.status_label}) dan tidak dapat diubah lagi.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                    Status Baru
                                </label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val) => setData('status', val as ReportStatus)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions
                                            .filter((opt) => opt.value !== report.status)
                                            .map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-500">{errors.status}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                    Catatan (opsional)
                                </label>
                                <Textarea
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    placeholder="Tambahkan catatan tindak lanjut..."
                                    rows={3}
                                />
                                {errors.note && (
                                    <p className="mt-1 text-xs text-red-500">{errors.note}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing || !data.status}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminReportShow;
