export { default as GuestLayout } from './layouts/guest-layout';

export const pages: Record<string, () => Promise<unknown>> = {
    welcome: () => import('./pages/welcome'),
    'announcements/index': () => import('./pages/announcements/index'),
    'announcements/show': () => import('./pages/announcements/show'),
    'articles/index': () => import('./pages/articles/index'),
    'articles/show': () => import('./pages/articles/show'),
    'achievements/index': () => import('./pages/achievements/index'),
    'achievements/show': () => import('./pages/achievements/show'),
    'extracurriculars/index': () => import('./pages/extracurriculars/index'),
    'extracurriculars/show': () => import('./pages/extracurriculars/show'),
    'facilities/show': () => import('./pages/facilities/show'),
    'curricula/show': () => import('./pages/curricula/show'),
    'gallery/index': () => import('./pages/gallery/index'),
    'gallery/show': () => import('./pages/gallery/show'),
    'public/organization': () => import('./pages/public/organization'),
};
