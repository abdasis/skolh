import { Head, usePage } from '@inertiajs/react';
import {
    type Alumni,
    type CurriculumCardResource,
    type SiteConfig,
    type Testimonial,
} from '@/types';
import HeroSection from './welcome/sections/hero-section';
import AboutSection from './welcome/sections/about-section';
import CurriculaSection from './welcome/sections/curricula-section';
import FacilitiesSection, {
    type FacilityCard,
} from './welcome/sections/facilities-section';
import ArticlesSection, {
    type ArticlePreview,
} from './welcome/sections/articles-section';
import AgendaSection, {
    type AgendaPreview,
} from './welcome/sections/agenda-section';
import TestimonialsSection from './welcome/sections/testimonials-section';
import AlumniSection from './welcome/sections/alumni-section';
import CtaSection from './welcome/sections/cta-section';
import ContactSection from './welcome/sections/contact-section';

const Welcome = ({
    canRegister = true,
    agendas = [],
    facilities = [],
    facilitiesTotal = 0,
    articles = [],
    articlesTotal = 0,
    curricula = [],
    testimonials = [],
    alumni = [],
}: {
    canRegister?: boolean;
    agendas?: AgendaPreview[];
    facilities?: FacilityCard[];
    facilitiesTotal?: number;
    articles?: ArticlePreview[];
    articlesTotal?: number;
    curricula?: CurriculumCardResource[];
    testimonials?: Testimonial[];
    alumni?: Alumni[];
}) => {
    const { siteConfig } = usePage<{
        siteConfig: SiteConfig | null;
    }>().props;

    return (
        <>
            <Head
                title={
                    siteConfig?.pageMeta?.title ??
                    siteConfig?.identity?.name ??
                    ''
                }
            >
                <meta
                    name="description"
                    content={
                        siteConfig?.pageMeta?.description ??
                        siteConfig?.identity?.tagline ??
                        undefined
                    }
                />
                <meta
                    property="og:title"
                    content={
                        siteConfig?.pageMeta?.title ??
                        siteConfig?.identity?.name ??
                        undefined
                    }
                />
                <meta
                    property="og:description"
                    content={
                        siteConfig?.pageMeta?.description ??
                        siteConfig?.identity?.tagline ??
                        undefined
                    }
                />
                <meta property="og:type" content="website" />
                <link
                    rel="canonical"
                    href={
                        typeof window !== 'undefined'
                            ? window.location.origin
                            : ''
                    }
                />
            </Head>

            {siteConfig?.sections?.hero?.enabled !== false && (
                <HeroSection siteConfig={siteConfig} />
            )}

            {siteConfig?.sections?.about?.enabled !== false && (
                <AboutSection siteConfig={siteConfig} />
            )}

            {curricula.length > 0 &&
                siteConfig?.sections?.curricula?.enabled !== false && (
                    <CurriculaSection
                        siteConfig={siteConfig}
                        curricula={curricula}
                    />
                )}

            {siteConfig?.sections?.facilities?.enabled !== false && (
                <FacilitiesSection
                    siteConfig={siteConfig}
                    facilities={facilities}
                    facilitiesTotal={facilitiesTotal}
                />
            )}

            {siteConfig?.sections?.articles?.enabled !== false && (
                <ArticlesSection
                    siteConfig={siteConfig}
                    articles={articles}
                    articlesTotal={articlesTotal}
                />
            )}

            {siteConfig?.sections?.agenda?.enabled !== false && (
                <AgendaSection siteConfig={siteConfig} agendas={agendas} />
            )}

            {siteConfig?.sections?.testimonials?.enabled !== false && (
                <TestimonialsSection
                    siteConfig={siteConfig}
                    testimonials={testimonials}
                />
            )}

            {alumni.length > 0 &&
                siteConfig?.sections?.alumni?.enabled !== false && (
                    <AlumniSection siteConfig={siteConfig} alumni={alumni} />
                )}

            <CtaSection siteConfig={siteConfig} canRegister={canRegister} />

            {siteConfig?.sections?.contact?.enabled !== false && (
                <ContactSection siteConfig={siteConfig} />
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'EducationalOrganization',
                        name: siteConfig?.identity?.name ?? undefined,
                        description: siteConfig?.identity?.tagline ?? undefined,
                        url:
                            typeof window !== 'undefined'
                                ? window.location.origin
                                : undefined,
                        address: siteConfig?.identity?.address ?? undefined,
                        telephone: siteConfig?.identity?.phone ?? undefined,
                        email: siteConfig?.identity?.email ?? undefined,
                    }),
                }}
            />
        </>
    );
};

export default Welcome;
