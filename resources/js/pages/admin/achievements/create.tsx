import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as AchievementController from '@/actions/App/Http/Controllers/Admin/AchievementController';
import { AchievementForm, type AchievementFormData } from './components/achievement-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    categories: EnumOption[];
    levels: EnumOption[];
}

const AdminAchievementsCreate = ({ categories, levels }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Prestasi', href: AchievementController.index.url() },
            { title: 'Tambah Prestasi', href: AchievementController.create.url() },
        ],
    });

    const form = useForm<AchievementFormData>({
        title: '',
        description: '',
        category: '',
        level: '',
        year: new Date().getFullYear(),
        attachment: null,
    });

    return (
        <>
            <Head title="Tambah Prestasi" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Prestasi</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan data prestasi sekolah baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AchievementForm
                                form={form}
                                url={AchievementController.store.url()}
                                cancelUrl={AchievementController.index.url()}
                                categories={categories}
                                levels={levels}
                                submitLabel="Tambah Prestasi"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAchievementsCreate;
