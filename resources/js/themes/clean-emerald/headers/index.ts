import { lazy } from 'react';

export type HeaderStyle = {
    key: string;
    label: string;
    component: React.LazyExoticComponent<React.ComponentType>;
    preview?: string;
};

export const headerStyles: HeaderStyle[] = [
    {
        key: 'style-one',
        label: 'Top Bar + Navbar',
        component: lazy(() => import('./header-style-one')),
        preview: 'Top bar info (jam, telepon, alamat) di atas navbar. Cocok untuk tampilan informatif.',
    },
    {
        key: 'style-two',
        label: 'Navbar Minimalis',
        component: lazy(() => import('./header-style-two')),
        preview: 'Hanya navbar tanpa top bar. Lebih bersih dan modern.',
    },
    {
        key: 'style-three',
        label: 'Transparan & Sticky',
        component: lazy(() => import('./header-style-three')),
        preview: 'Transparan di atas hero, background muncul saat halaman digulir ke bawah.',
    },
];
