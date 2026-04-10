import { Head, useForm, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeroSection } from './welcome-content/hero-section';
import { AboutSection } from './welcome-content/about-section';
import { CtaSection } from './welcome-content/cta-section';
import type { SiteHero, SiteAbout, SiteCta } from '@/types';

interface Props {
    hero: SiteHero;
    about: SiteAbout;
    cta: Omit<SiteCta, 'image_url'>;
    heroBgImageUrl: string | null;
    heroSideImageUrl: string | null;
    ctaImageUrl: string | null;
}

interface FormData {
    hero: {
        subtitle: string;
        title: string;
        title_accent: string;
        description: string;
        badge_text: string;
        cta_buttons: {
            label: string;
            href: string;
            variant: 'primary' | 'secondary';
        }[];
        stats: { value: string; label: string }[];
    };
    about: {
        heading: string;
        paragraphs: string[];
        feature_cards: {
            icon: string;
            title: string;
            description: string;
            stat_value: string;
            stat_label: string;
        }[];
    };
    cta: Omit<SiteCta, 'image_url'>;
    hero_bg_image_url: string | null;
    hero_side_image_url: string | null;
    cta_image_url: string | null;
    _method: string;
}

const WelcomeContentPage = ({
    hero,
    about,
    cta,
    heroBgImageUrl,
    heroSideImageUrl,
    ctaImageUrl,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Konten Beranda', href: '#' },
        ],
    });

    const { data, setData, post, processing, errors } = useForm<FormData>({
        hero: {
            subtitle: hero.subtitle ?? '',
            title: hero.title ?? '',
            title_accent: hero.title_accent ?? '',
            description: hero.description ?? '',
            badge_text: hero.badge_text ?? '',
            cta_buttons: hero.cta_buttons ?? [],
            stats: hero.stats ?? [],
        },
        about: {
            heading: about.heading ?? '',
            paragraphs: about.paragraphs ?? [],
            feature_cards: about.feature_cards ?? [],
        },
        cta: {
            title: cta.title ?? null,
            subtitle: cta.subtitle ?? null,
            button_label: cta.button_label ?? 'Daftar Sekarang',
            button_href: cta.button_href ?? '#kontak',
        },
        hero_bg_image_url: heroBgImageUrl,
        hero_side_image_url: heroSideImageUrl,
        cta_image_url: ctaImageUrl,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/welcome-content', { preserveScroll: true });
    };

    return (
        <>
            <Head title="Konten Beranda" />
            <div className="flex flex-col gap-4 p-2">
                <div className="px-2">
                    <h1 className="text-xl font-semibold">Konten Beranda</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola konten seksi hero dan tentang pada halaman
                        beranda.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 px-2"
                >
                    <HeroSection
                        data={data.hero}
                        heroBgImageUrl={data.hero_bg_image_url}
                        heroSideImageUrl={data.hero_side_image_url}
                        errors={errors}
                        onChange={(hero) => setData('hero', hero)}
                        onBgImageChange={(url) =>
                            setData('hero_bg_image_url', url)
                        }
                        onSideImageChange={(url) =>
                            setData('hero_side_image_url', url)
                        }
                    />

                    <AboutSection
                        data={data.about}
                        errors={errors}
                        onChange={(about) => setData('about', about)}
                    />

                    <CtaSection
                        data={data.cta}
                        ctaImageUrl={data.cta_image_url}
                        errors={errors}
                        onChange={(ctaData) => setData('cta', ctaData)}
                        onImageChange={(url) => setData('cta_image_url', url)}
                    />

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

export default WelcomeContentPage;
