import { ClipboardList, Clock, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import { type RegistrationStats } from '@/types';

interface StatCard {
    title: string;
    value: number;
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    valueColor: string;
    sub: string;
}

interface Props {
    stats: RegistrationStats;
}

const RegistrationStatsCards = ({ stats }: Props) => {
    const cards: StatCard[] = [
        {
            title: 'Total',
            value: stats.total,
            icon: ClipboardList,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua pendaftar',
        },
        {
            title: 'Menunggu',
            value: stats.pending,
            icon: Clock,
            iconColor: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-950/50',
            valueColor: 'text-amber-700 dark:text-amber-400',
            sub: 'Belum diverifikasi',
        },
        {
            title: 'Terverifikasi',
            value: stats.verified,
            icon: ShieldCheck,
            iconColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/50',
            valueColor: 'text-purple-700 dark:text-purple-400',
            sub: 'Sedang diproses',
        },
        {
            title: 'Diterima',
            value: stats.accepted,
            icon: CheckCircle,
            iconColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            valueColor: 'text-green-700 dark:text-green-400',
            sub: 'Lolos seleksi',
        },
        {
            title: 'Ditolak',
            value: stats.rejected,
            icon: XCircle,
            iconColor: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-950/50',
            valueColor: 'text-red-700 dark:text-red-400',
            sub: 'Tidak lolos seleksi',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                >
                    <div className="px-4 pt-3 pb-3">
                        <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="flex items-center gap-3 p-4">
                            <div className={`shrink-0 rounded-lg p-2.5 ${card.bgColor}`}>
                                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`text-2xl font-bold leading-tight ${card.valueColor}`}>{card.value}</p>
                                <p className="truncate text-xs text-muted-foreground">{card.sub}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RegistrationStatsCards;
