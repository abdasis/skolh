import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import * as ReportController from '@/actions/App/Http/Controllers/Admin/ReportController';
import { DataTable, type DataTableState } from '@/components/data-table';
import { type Report, type ReportStats } from '@/types';
import { ReportStatsCards } from './components/report-stats-cards';
import { ReportDetailModal } from './components/report-detail-modal';
import { createReportColumns } from './components/report-columns';

interface Props {
    reports: {
        data: Report[];
        meta: { total: number; per_page: number; current_page: number };
    };
    stats: ReportStats;
    filters: {
        status?: string;
        category?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
    };
    statusOptions: { value: string; label: string }[];
}

const AdminReportsIndex = ({
    reports,
    stats,
    filters,
    statusOptions,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Laporan', href: ReportController.index.url() },
        ],
    });

    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const handleView = (report: Report) => {
        setSelectedReport(report);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
    };

    const handleStateChange = (state: DataTableState) => {
        router.get(
            ReportController.index.url(),
            {
                search: state.globalFilter || undefined,
                per_page: state.pagination.pageSize,
                page: state.pagination.pageIndex + 1,
                status: filters.status,
                category: filters.category,
                date_from: filters.date_from,
                date_to: filters.date_to,
            } as Record<string, string | number | undefined>,
            { preserveState: true, replace: true },
        );
    };

    const categoryOptions = [
        { value: 'facilities', label: 'Fasilitas' },
        { value: 'teaching_quality', label: 'Kualitas Pengajaran' },
        { value: 'administration', label: 'Administrasi' },
        { value: 'safety', label: 'Keamanan' },
        { value: 'other', label: 'Lainnya' },
    ];

    const columns = createReportColumns(handleView);

    return (
        <>
            <Head title="Laporan" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Laporan</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola laporan dan pengaduan dari orang tua atau
                            pengunjung.
                        </p>
                    </div>
                </div>

                <ReportStatsCards stats={stats} />

                <div className="px-2">
                    <div className="rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-4 pt-3 pb-3">
                            <p className="text-xs font-medium text-muted-foreground">
                                Laporan per Kategori
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="grid grid-cols-2 divide-x divide-y divide-foreground/6 sm:grid-cols-3 lg:grid-cols-5">
                                {[
                                    { key: 'facilities', label: 'Fasilitas' },
                                    {
                                        key: 'teaching_quality',
                                        label: 'Kualitas Pengajaran',
                                    },
                                    {
                                        key: 'administration',
                                        label: 'Administrasi',
                                    },
                                    { key: 'safety', label: 'Keamanan' },
                                    { key: 'other', label: 'Lainnya' },
                                ].map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="flex flex-col gap-1 p-4"
                                    >
                                        <p className="text-2xl leading-tight font-bold">
                                            {stats.by_category?.[
                                                key as keyof typeof stats.by_category
                                            ] ?? 0}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={reports.data}
                        mode="server"
                        totalRows={reports.meta.total}
                        searchPlaceholder="Cari laporan berdasarkan subjek..."
                        onStateChange={handleStateChange}
                        title="Daftar Laporan"
                        description="Semua laporan yang masuk dari pengunjung website."
                        filters={[
                            {
                                type: 'select',
                                key: 'status',
                                label: 'Status',
                                placeholder: 'Semua Status',
                                options: statusOptions,
                            },
                            {
                                type: 'select',
                                key: 'category',
                                label: 'Kategori',
                                placeholder: 'Semua Kategori',
                                options: categoryOptions,
                            },
                            {
                                type: 'text',
                                key: 'date_from',
                                label: 'Dari Tanggal',
                                placeholder: 'YYYY-MM-DD',
                            },
                            {
                                type: 'text',
                                key: 'date_to',
                                label: 'Sampai Tanggal',
                                placeholder: 'YYYY-MM-DD',
                            },
                        ]}
                        filterValues={{
                            status: filters.status,
                            category: filters.category,
                            date_from: filters.date_from,
                            date_to: filters.date_to,
                        }}
                        filterUrl={ReportController.index.url()}
                    />
                </div>
            </div>

            <ReportDetailModal
                report={selectedReport}
                open={selectedReport !== null}
                onClose={handleCloseModal}
                statusOptions={statusOptions}
            />
        </>
    );
};

export default AdminReportsIndex;
