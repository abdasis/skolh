import { AlertTriangle, Link2, Type, Users } from 'lucide-react';
import { type OrganizationNodeStats } from '@/types';

interface Props {
    stats: OrganizationNodeStats;
}

const OrganizationNodeStatsCards = ({ stats }: Props) => {
    const cards = [
        {
            title: 'Total Node',
            value: stats.total,
            icon: Users,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua node struktur',
        },
        {
            title: 'Terhubung ke Guru',
            value: stats.linked,
            icon: Link2,
            iconColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            valueColor: 'text-green-700 dark:text-green-400',
            sub: 'Node dengan data guru',
        },
        {
            title: 'Entri Manual',
            value: stats.manual,
            icon: Type,
            iconColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/50',
            valueColor: 'text-purple-700 dark:text-purple-400',
            sub: 'Node dengan nama manual',
        },
        {
            title: 'Broken Link',
            value: stats.broken,
            icon: AlertTriangle,
            iconColor: stats.broken > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground',
            bgColor: stats.broken > 0 ? 'bg-orange-50 dark:bg-orange-950/50' : 'bg-muted',
            valueColor: stats.broken > 0 ? 'text-orange-700 dark:text-orange-400' : '',
            sub: 'Perlu ditindaklanjuti',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                >
                    <div className="px-4 pt-3 pb-3">
                        <p className="text-xs font-medium text-muted-foreground">
                            {card.title}
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="flex items-center gap-3 p-4">
                            <div className={`shrink-0 rounded-lg p-2.5 ${card.bgColor}`}>
                                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`text-2xl leading-tight font-bold ${card.valueColor}`}>
                                    {card.value}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {card.sub}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { OrganizationNodeStatsCards };
