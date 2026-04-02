import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as AchievementController from '@/actions/App/Http/Controllers/Admin/AchievementController';
import { AchievementForm, type AchievementFormData } from './components/achievement-form';
import { type AchievementResource } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    achievement: AchievementResource;
    categories: EnumOption[];
    levels: EnumOption[];
}

const AdminAchievementsEdit = ({ achievement, categories, levels }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Prestasi', href: AchievementController.index.url() },
            { title: 'Edit Prestasi' },
        ],
    });

    const form = useForm<AchievementFormData>({
        _method: 'PUT',
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        level: achievement.level,
        year: achievement.year,
        attachment: null,
    });

    return (
        <>
            <Head title="Edit Prestasi" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Prestasi</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data prestasi sekolah.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AchievementForm
                                form={form}
                                url={AchievementController.update.url({
                                    achievement: achievement.id,
                                })}
                                cancelUrl={AchievementController.index.url()}
                                categories={categories}
                                levels={levels}
                                submitLabel="Simpan Perubahan"
                                currentAttachment={achievement.attachment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAchievementsEdit;
