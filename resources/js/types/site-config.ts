export type SiteIdentity = {
    name: string;
    tagline: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    hours: string | null;
    logo_url: string | null;
    favicon_url: string | null;
};

export type SiteSocial = {
    facebook: string | null;
    youtube: string | null;
    instagram: string | null;
    whatsapp: string | null;
};

export type CtaButton = {
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
};

export type HeroStat = {
    value: string;
    label: string;
};

export type SiteHero = {
    subtitle: string | null;
    title: string | null;
    title_accent: string | null;
    description: string | null;
    badge_text: string | null;
    bg_image_url: string | null;
    side_image_url: string | null;
    cta_buttons: CtaButton[];
    stats: HeroStat[];
};

export type FeatureCard = {
    icon: string;
    title: string;
    description: string;
    stat_value: string;
    stat_label: string;
};

export type SiteAbout = {
    heading: string;
    paragraphs: string[];
    feature_cards: FeatureCard[];
};

export type SiteNavItem = {
    id: string;
    label: string;
    href: string;
    type: 'route' | 'anchor' | 'external';
    route_name?: string;
    visible: boolean;
    order: number;
    children?: SiteNavItem[];
};

export type FooterLink = {
    label: string;
    href: string;
    type: 'route' | 'anchor' | 'external';
};

export type FooterGroup = {
    title: string;
    links: FooterLink[];
};

export type SiteNavigation = {
    header: SiteNavItem[];
    footer: FooterGroup[];
};

export type PageMeta = {
    title: string;
    description: string | null;
};

export type SectionConfig = {
    enabled: boolean;
    limit?: number;
};

export type SiteSections = {
    hero: SectionConfig;
    about: SectionConfig;
    agenda: SectionConfig;
    facilities: SectionConfig;
    curricula: SectionConfig;
    articles: SectionConfig;
    testimonials: SectionConfig;
    alumni: SectionConfig;
    contact: SectionConfig;
};

export type SiteConfig = {
    identity: SiteIdentity;
    social: SiteSocial;
    navigation: SiteNavigation;
    pageMeta: PageMeta;
    sections: SiteSections;
    hero: SiteHero;
    about: SiteAbout;
};
