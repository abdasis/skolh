import { Head, router, setLayoutProps } from '@inertiajs/react';
import { DataTable, type DataTableState } from '@/components/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import * as RegistrationController from '@/actions/App/Http/Controllers/Admin/RegistrationController';
import * as AdmissionPeriodController from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import { createRegistrationColumns } from './components/registration-columns';
import RegistrationStatsCards from './components/registration-stats-cards';
import { type AdmissionPeriod, type Registration, type RegistrationStats } from '@/types';

interface Props {
    registrations: {
        data: Registration[];
        meta: { total: number; per_page: number; current_page: number };
    };
    periods: { data: AdmissionPeriod[] };
    activePeriod: AdmissionPeriod | null;
    stats: RegistrationStats;
    statusOptions: { value: string; label: string }[];
}

const AdminRegistrationsIndex = ({ registrations, periods, activePeriod, stats }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Data Pendaftaran', href: RegistrationController.index.url() },
        ],
    });

    const handleView = (registration: Registration) => {
        router.visit(RegistrationController.show.url({ registration: registration.id }));
    };

    const handleStateChange = (state: DataTableState) => {
        const params: Record<string, unknown> = {
            search: state.globalFilter || undefined,
            per_page: state.pagination.pageSize,
            page: state.pagination.pageIndex + 1,
        };

        if (state.sorting.length > 0) {
            params.sort = state.sorting.map(s => ({ id: s.id, desc: s.desc }));
        }

        router.get(RegistrationController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePeriodChange = (periodId: string) => {
        router.get(RegistrationController.index.url(), { period_id: periodId }, { preserveState: false });
    };

    const handleExport = () => {
        const periodId = activePeriod?.id;
        window.location.href = RegistrationController.exportMethod.url() + (periodId ? `?period_id=${periodId}` : '');
    };

    const columns = createRegistrationColumns(handleView);

    return (
        <>
            <Head title="Data Pendaftaran" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-start justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Data Pendaftaran</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola dan pantau semua data pendaftaran murid baru.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select onValueChange={handlePeriodChange} defaultValue={activePeriod?.id.toString()}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Pilih Periode" />
                            </SelectTrigger>
                            <SelectContent>
                                {periods.data.map(p => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.academic_year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={handleExport}>
                            Export Excel
                        </Button>
                    </div>
                </div>

                <div className="px-2">
                    <RegistrationStatsCards stats={stats} />
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={registrations.data}
                        mode="server"
                        totalRows={registrations.meta.total}
                        searchPlaceholder="Cari nama, NIK, NISN, atau nomor pendaftaran..."
                        onStateChange={handleStateChange}
                    />
                </div>
            </div>
        </>
    );
};

export default AdminRegistrationsIndex;
