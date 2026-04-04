import type { SiteConfig } from './site-config';

export type ContactPageProps = {
    siteConfig: SiteConfig;
    flash: {
        success?: string;
        error?: string;
    };
};
