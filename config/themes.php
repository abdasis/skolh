<?php

return [
    /*
     * Tema default yang digunakan sebagai fallback jika tema aktif tidak ditemukan.
     */
    'default' => 'clean-emerald',

    /*
     * Daftar komponen halaman yang wajib ada di setiap tema.
     */
    'required_pages' => [
        'welcome',
        'announcements/index',
        'announcements/show',
        'articles/index',
        'articles/show',
        'achievements/index',
        'achievements/show',
        'extracurriculars/index',
        'extracurriculars/show',
        'facilities/show',
        'curricula/show',
        'gallery/index',
        'gallery/show',
        'public/organization',
        'admission/register',
        'admission/closed',
        'admission/success',
        'admission/check',
    ],
];
