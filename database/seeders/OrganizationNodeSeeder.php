<?php

namespace Database\Seeders;

use App\Models\OrganizationNode;
use Illuminate\Database\Seeder;

class OrganizationNodeSeeder extends Seeder
{
    public function run(): void
    {
        OrganizationNode::query()->delete();

        // Root: Kepala Sekolah
        $kepalaSekolah = OrganizationNode::create([
            'parent_id' => null,
            'position' => 'Kepala Sekolah',
            'name' => 'Ustadz Ahmad Fauzi, S.Pd.I',
            'nip' => '197805102005011003',
            'sort_order' => 1,
            'branch_side' => 'center',
            'connector_from' => 'bottom',
        ]);

        // Ketua Komite — kanan dari Kepala Sekolah
        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Ketua Komite',
            'name' => 'H. Bambang Prasetyo, S.E',
            'sort_order' => 1,
            'branch_side' => 'right',
        ]);

        // Tenaga Perpustakaan — kiri dari Kepala Sekolah (sejajar Tenaga Administrasi)
        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Tenaga Perpustakaan',
            'name' => 'Ustadzah Nurul Hidayah, S.IP',
            'nip' => '198506272008012005',
            'sort_order' => 2,
            'branch_side' => 'left',
        ]);

        // Tenaga Administrasi — kanan dari Kepala Sekolah (sejajar Tenaga Perpustakaan)
        $admin = OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Tenaga Administrasi',
            'name' => 'Bapak Rizki Amrizal, S.Kom',
            'nip' => '199001152015031002',
            'sort_order' => 2,
            'branch_side' => 'right',
        ]);

        // Guru-guru — center (bawah) dari Kepala Sekolah
        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas I',
            'name' => 'Ustadzah Fatimah Az-Zahra, S.Pd',
            'nip' => '199507182018012001',
            'sort_order' => 4,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas II A',
            'name' => 'Ustadzah Maryam Soleha, S.Pd',
            'nip' => '199302052016012001',
            'sort_order' => 5,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas II B',
            'name' => 'Ustadzah Khadidjah Amini, S.Pd',
            'nip' => '199610022019012002',
            'sort_order' => 6,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas III',
            'name' => 'Ustadzah Aisyah Putri, S.Pd',
            'nip' => '199201102015012002',
            'sort_order' => 7,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas IV',
            'name' => 'Ustadz Hasan Basri, S.Pd.I',
            'nip' => '199408172017011003',
            'sort_order' => 8,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas V',
            'name' => 'Ustadzah Rohmah Fitriani, S.Pd',
            'nip' => '198811202013012001',
            'sort_order' => 9,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Kelas VI',
            'name' => 'Ustadzah Zainab Alwi, S.Pd',
            'nip' => '198705092012012002',
            'sort_order' => 10,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Agama Islam',
            'name' => 'Ustadz Abdurrahman Hafidz, Lc',
            'nip' => '198809012011011004',
            'sort_order' => 11,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Agama Kristen',
            'name' => 'Bapak Daniel Siregar, S.Th',
            'nip' => '199205142016011002',
            'sort_order' => 12,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Bahasa Inggris',
            'name' => 'Ustadzah Dewi Kurniasih, S.Pd',
            'nip' => '198712092010012003',
            'sort_order' => 13,
            'branch_side' => 'center',
        ]);

        OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Bahasa Arab',
            'name' => 'Ustadz Iqbal Maulana, S.Pd.I',
            'nip' => '199104232013011002',
            'sort_order' => 14,
            'branch_side' => 'center',
        ]);

        $guruPjas = OrganizationNode::create([
            'parent_id' => $kepalaSekolah->id,
            'position' => 'Guru Penjasorkes',
            'name' => 'Ustadz Wahyu Saputra, S.Pd',
            'nip' => '199602142019011001',
            'sort_order' => 15,
            'branch_side' => 'center',
        ]);

        // Seluruh Siswa
        $siswa = OrganizationNode::create([
            'parent_id' => $guruPjas->id,
            'position' => 'Seluruh Siswa',
            'sort_order' => 1,
            'branch_side' => 'center',
        ]);

        // Masyarakat
        OrganizationNode::create([
            'parent_id' => $siswa->id,
            'position' => 'Masyarakat',
            'sort_order' => 1,
            'branch_side' => 'center',
        ]);
    }
}
