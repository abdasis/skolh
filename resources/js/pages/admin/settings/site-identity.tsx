import { Head, useForm, setLayoutProps } from '@inertiajs/react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SiteIdentity {
    name: string;
    tagline: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    hours: string | null;
}

interface SiteSocial {
    facebook: string | null;
    youtube: string | null;
    instagram: string | null;
    whatsapp: string | null;
}

interface Props {
    identity: SiteIdentity;
    social: SiteSocial;
    logoUrl: string | null;
    faviconUrl: string | null;
}

const SiteIdentityPage = ({ identity, social, logoUrl, faviconUrl }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Identitas Situs', href: '#' },
        ],
    });

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        tagline: string;
        phone: string;
        email: string;
        address: string;
        hours: string;
        facebook: string;
        youtube: string;
        instagram: string;
        whatsapp: string;
        logo: File | null;
        favicon: File | null;
        _method: string;
    }>({
        name: identity.name ?? '',
        tagline: identity.tagline ?? '',
        phone: identity.phone ?? '',
        email: identity.email ?? '',
        address: identity.address ?? '',
        hours: identity.hours ?? '',
        facebook: social.facebook ?? '',
        youtube: social.youtube ?? '',
        instagram: social.instagram ?? '',
        whatsapp: social.whatsapp ?? '',
        logo: null,
        favicon: null,
        _method: 'PUT',
    });

    const logoPreview = useMemo(() => (data.logo ? URL.createObjectURL(data.logo) : null), [data.logo]);
    const faviconPreview = useMemo(() => (data.favicon ? URL.createObjectURL(data.favicon) : null), [data.favicon]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/site-identity', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Identitas Situs" />
            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Identitas Situs</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola nama, tagline, informasi kontak, logo, dan tautan media sosial.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Informasi Dasar</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Situs <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="SDIT Al-Aziz"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tagline">Tagline</Label>
                                    <Input
                                        id="tagline"
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline', e.target.value)}
                                        placeholder="Sekolah Dasar Islam Terpadu"
                                    />
                                    {errors.tagline && <p className="text-sm text-destructive">{errors.tagline}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Informasi Kontak</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="(031) 3095-xxxx"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="info@sditalaziz.sch.id"
                                        />
                                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Jl. KH. Abdul Hamid No. 23..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hours">Jam Operasional</Label>
                                    <Input
                                        id="hours"
                                        value={data.hours}
                                        onChange={(e) => setData('hours', e.target.value)}
                                        placeholder="Sen - Jum, 07:00 - 15:00 WIB"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Media Sosial</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {(['facebook', 'youtube', 'instagram', 'whatsapp'] as const).map((platform) => (
                                        <div key={platform} className="space-y-2">
                                            <Label htmlFor={platform} className="capitalize">{platform}</Label>
                                            <Input
                                                id={platform}
                                                value={data[platform]}
                                                onChange={(e) => setData(platform, e.target.value)}
                                                placeholder={`https://${platform}.com/...`}
                                            />
                                            {errors[platform] && <p className="text-sm text-destructive">{errors[platform]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Logo & Favicon</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-3">
                                        <Label>Logo Situs</Label>
                                        {(logoPreview ?? logoUrl) && (
                                            <img src={logoPreview ?? logoUrl!} alt="Logo saat ini" className="h-16 w-auto rounded border object-contain" />
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                                            onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
                                        />
                                        {errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Favicon</Label>
                                        {(faviconPreview ?? faviconUrl) && (
                                            <img src={faviconPreview ?? faviconUrl!} alt="Favicon saat ini" className="h-8 w-8 rounded border object-contain" />
                                        )}
                                        <Input
                                            type="file"
                                            accept=".ico,image/png"
                                            onChange={(e) => setData('favicon', e.target.files?.[0] ?? null)}
                                        />
                                        {errors.favicon && <p className="text-sm text-destructive">{errors.favicon}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SiteIdentityPage;
