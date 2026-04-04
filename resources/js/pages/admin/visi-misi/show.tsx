import { Head, Link, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import * as VisiMisiController from '@/actions/App/Http/Controllers/Admin/VisiMisiController';

interface Props {
    vision: string;
    mission: string;
}

const AdminVisiMisiShow = ({ vision, mission }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Visi & Misi', href: VisiMisiController.show.url() },
        ],
    });

    return (
        <>
            <Head title="Visi & Misi" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Visi & Misi</h1>
                        <p className="text-sm text-muted-foreground">
                            Konten visi dan misi sekolah yang ditampilkan di
                            website.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={VisiMisiController.edit.url()}>Edit</Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                                        Visi
                                    </h2>
                                    {vision ? (
                                        <p className="text-base leading-relaxed">
                                            {vision}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">
                                            Belum diisi
                                        </p>
                                    )}
                                </div>

                                <div className="border-t" />

                                <div>
                                    <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                                        Misi
                                    </h2>
                                    {mission ? (
                                        <div
                                            className="tiptap-content text-base leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: mission,
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
                </div>
            </div>
        </>
    );
};

export default AdminVisiMisiShow;
