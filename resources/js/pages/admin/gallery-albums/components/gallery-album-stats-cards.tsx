import { FileText, Images, ImageIcon, Globe } from 'lucide-react';
import { type GalleryAlbumStats } from '@/types';

interface Props {
    stats: GalleryAlbumStats;
}

const GalleryAlbumStatsCards = ({ stats }: Props) => {
    const cards = [
        {
            title: 'Total Album',
            value: stats.total,
            icon: Images,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua album galeri',
        },
        {
            title: 'Published',
            value: stats.published,
            icon: Globe,
            iconColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            valueColor: 'text-green-700 dark:text-green-400',
            sub: 'Tampil di halaman publik',
        },
        {
            title: 'Draft',
            value: stats.draft,
            icon: FileText,
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950/50',
            valueColor: 'text-yellow-700 dark:text-yellow-400',
            sub: 'Belum dipublikasikan',
        },
        {
            title: 'Total Foto',
            value: stats.total_images,
            icon: ImageIcon,
            iconColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/50',
            valueColor: 'text-purple-700 dark:text-purple-400',
            sub: 'Foto di semua album',
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

export { GalleryAlbumStatsCards };
