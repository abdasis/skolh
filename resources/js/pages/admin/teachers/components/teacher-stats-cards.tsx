import { Activity, UserMinus, Users } from 'lucide-react';
import { type TeacherStats } from '@/types';

interface Props {
    stats: TeacherStats;
}

const TeacherStatsCards = ({ stats }: Props) => {
    const cards = [
        {
            title: 'Total Guru',
            value: stats.total,
            icon: Users,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua data guru',
        },
        {
            title: 'Aktif',
            value: stats.active,
            icon: Activity,
            iconColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            valueColor: 'text-green-700 dark:text-green-400',
            sub: 'Guru aktif mengajar',
        },
        {
            title: 'Nonaktif',
            value: stats.inactive,
            icon: UserMinus,
            iconColor: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-950/50',
            valueColor: 'text-red-700 dark:text-red-400',
            sub: 'Guru tidak aktif',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-3">
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

export { TeacherStatsCards };
