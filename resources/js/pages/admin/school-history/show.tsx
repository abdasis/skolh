import { Head, Link, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import * as SchoolHistoryController from '@/actions/App/Http/Controllers/Admin/SchoolHistoryController';

interface Props {
    history: string;
}

const AdminSchoolHistoryShow = ({ history }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            {
                title: 'School History',
                href: SchoolHistoryController.show.url(),
            },
        ],
    });

    return (
        <>
            <Head title="Sejarah Sekolah" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Sejarah Sekolah
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Konten sejarah sekolah yang ditampilkan di website.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={SchoolHistoryController.edit.url()}>
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            {history ? (
                                <div
                                    className="tiptap-content text-base leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: history,
                                    }}
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    Belum diisi
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSchoolHistoryShow;
