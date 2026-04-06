<?php

return [
    /*
     * Daftar seeder opsional yang dapat dipilih saat instalasi.
     * RolePermissionSeeder selalu berjalan secara otomatis (tidak ada di sini).
     */
    'seeders' => [
        'CategorySeeder' => [
            'class' => \Database\Seeders\CategorySeeder::class,
            'label' => 'Kategori',
            'description' => 'Kategori artikel dan pengumuman (6 item)',
            'group' => 'Konten',
        ],
        'AnnouncementSeeder' => [
            'class' => \Database\Seeders\AnnouncementSeeder::class,
            'label' => 'Pengumuman',
            'description' => 'Contoh pengumuman sekolah (12 item)',
            'group' => 'Konten',
        ],
        'ArticleSeeder' => [
            'class' => \Database\Seeders\ArticleSeeder::class,
            'label' => 'Artikel',
            'description' => 'Contoh artikel blog (10 item)',
            'group' => 'Konten',
        ],
        'AgendaSeeder' => [
            'class' => \Database\Seeders\AgendaSeeder::class,
            'label' => 'Agenda',
            'description' => 'Contoh acara kalender (12 item)',
            'group' => 'Konten',
        ],
        'FacilitySeeder' => [
            'class' => \Database\Seeders\FacilitySeeder::class,
            'label' => 'Fasilitas',
            'description' => 'Daftar fasilitas sekolah (10 item)',
            'group' => 'Fasilitas & Kurikulum',
        ],
        'CurriculumSeeder' => [
            'class' => \Database\Seeders\CurriculumSeeder::class,
            'label' => 'Kurikulum',
            'description' => 'Program kurikulum (6 item)',
            'group' => 'Fasilitas & Kurikulum',
        ],
        'ExtracurricularSeeder' => [
            'class' => \Database\Seeders\ExtracurricularSeeder::class,
            'label' => 'Ekstrakurikuler',
            'description' => 'Kegiatan ekstrakurikuler (8 item)',
            'group' => 'Fasilitas & Kurikulum',
        ],
        'TeacherSeeder' => [
            'class' => \Database\Seeders\TeacherSeeder::class,
            'label' => 'Guru',
            'description' => 'Data staf pengajar (30 item)',
            'group' => 'Orang',
        ],
        'AlumniSeeder' => [
            'class' => \Database\Seeders\AlumniSeeder::class,
            'label' => 'Alumni',
            'description' => 'Testimoni alumni (6 item)',
            'group' => 'Orang',
        ],
        'TestimonialSeeder' => [
            'class' => \Database\Seeders\TestimonialSeeder::class,
            'label' => 'Testimoni',
            'description' => 'Testimoni orang tua siswa (6 item)',
            'group' => 'Orang',
        ],
        'OrganizationNodeSeeder' => [
            'class' => \Database\Seeders\OrganizationNodeSeeder::class,
            'label' => 'Struktur Organisasi',
            'description' => 'Struktur organisasi sekolah',
            'group' => 'Orang',
        ],
        'AdmissionPeriodSeeder' => [
            'class' => \Database\Seeders\AdmissionPeriodSeeder::class,
            'label' => 'Periode Penerimaan',
            'description' => 'Konfigurasi periode penerimaan siswa (5 item)',
            'group' => 'Penerimaan',
        ],
        'RegistrationSeeder' => [
            'class' => \Database\Seeders\RegistrationSeeder::class,
            'label' => 'Pendaftaran',
            'description' => 'Contoh pendaftaran siswa (40 item)',
            'group' => 'Penerimaan',
        ],
        'SiteSettingSeeder' => [
            'class' => \Database\Seeders\SiteSettingSeeder::class,
            'label' => 'Pengaturan Situs',
            'description' => 'Pengaturan situs default (hero, navigasi, sosial, dll.)',
            'group' => 'Konten Situs',
        ],
    ],
];
