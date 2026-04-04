import { Head, useForm, setLayoutProps } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface PageMetaEntry {
    key: string;
    label: string;
    title: string;
    description: string | null;
}

interface Props {
    pages: PageMetaEntry[];
}

const PageMetaPage = ({ pages }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Meta Halaman', href: '#' },
        ],
    });

    const { data, setData, put, processing } = useForm({
        pages: pages.map((p) => ({
            key: p.key,
            title: p.title ?? '',
            description: p.description ?? '',
        })),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings/page-meta', { preserveScroll: true });
    };

    const updatePage = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...data.pages];
        updated[index] = { ...updated[index], [field]: value };
        setData('pages', updated);
    };

    return (
        <>
            <Head title="Meta Halaman" />
            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Meta Halaman</h1>
                        <p className="text-sm text-muted-foreground">
                            Atur judul dan deskripsi meta untuk setiap halaman publik. Gunakan <code className="rounded bg-muted px-1 text-xs">{'{site_name}'}</code> dan <code className="rounded bg-muted px-1 text-xs">{'{tagline}'}</code> sebagai placeholder.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
                    {pages.map((page, i) => (
                        <div key={page.key} className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="px-5 py-4">
                                <p className="text-sm font-semibold">{page.label}</p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="space-y-3 p-5">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Judul Halaman</Label>
                                        <Input
                                            value={data.pages[i]?.title ?? ''}
                                            onChange={(e) => updatePage(i, 'title', e.target.value)}
                                            placeholder="{site_name} - {tagline}"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Deskripsi Meta</Label>
                                        <Textarea
                                            value={data.pages[i]?.description ?? ''}
                                            onChange={(e) => updatePage(i, 'description', e.target.value)}
                                            rows={2}
                                            placeholder="Deskripsi singkat halaman untuk mesin pencari..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Separator />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Meta'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PageMetaPage;
