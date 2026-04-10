<?php

namespace Database\Seeders;

use App\Enums\MajorStatus;
use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * @var array<int, array{title: string, description: string, content: string, status: MajorStatus}>
     */
    private array $majors = [
        [
            'title' => 'Teknik Komputer dan Jaringan',
            'description' => 'Program keahlian yang mempelajari instalasi, konfigurasi, dan pemeliharaan sistem komputer serta jaringan komputer lokal maupun berbasis internet.',
            'content' => '<p>Teknik Komputer dan Jaringan (TKJ) adalah program keahlian yang mempersiapkan siswa untuk menjadi teknisi handal di bidang komputer dan jaringan. Siswa akan mempelajari cara merakit komputer, menginstalasi sistem operasi, mengkonfigurasi jaringan LAN/WAN, serta mengelola server.</p><p>Lulusan TKJ memiliki kompetensi dalam instalasi dan konfigurasi jaringan komputer, administrasi server Linux dan Windows, keamanan jaringan, serta troubleshooting perangkat keras dan lunak. Program ini didukung oleh laboratorium komputer dan jaringan yang modern dengan peralatan Cisco dan MikroTik.</p><p>Prospek karir lulusan TKJ sangat luas, mulai dari teknisi jaringan, administrator sistem, network engineer, hingga wirausaha di bidang jasa komputer dan jaringan.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Rekayasa Perangkat Lunak',
            'description' => 'Program keahlian yang berfokus pada pengembangan aplikasi perangkat lunak, pemrograman web, mobile, dan desktop menggunakan berbagai bahasa pemrograman modern.',
            'content' => '<p>Rekayasa Perangkat Lunak (RPL) adalah program keahlian yang mempersiapkan siswa menjadi pengembang perangkat lunak yang kompeten. Siswa akan belajar berbagai bahasa pemrograman seperti Python, JavaScript, PHP, Java, serta framework modern untuk pengembangan aplikasi web dan mobile.</p><p>Kurikulum RPL mencakup algoritma dan pemrograman dasar, basis data, pengembangan web frontend dan backend, pengembangan aplikasi mobile, serta metodologi pengembangan perangkat lunak. Siswa juga dibekali kemampuan analisis dan desain sistem informasi.</p><p>Lulusan RPL dapat berkarir sebagai programmer, web developer, mobile developer, UI/UX designer, analis sistem, atau membangun startup teknologi sendiri.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Multimedia',
            'description' => 'Program keahlian yang mengembangkan kreativitas dan keterampilan di bidang desain grafis, animasi, fotografi, videografi, dan produksi konten digital.',
            'content' => '<p>Multimedia adalah program keahlian yang menggabungkan seni, teknologi, dan komunikasi visual. Siswa akan belajar desain grafis menggunakan Adobe Photoshop, Illustrator, dan CorelDraw, animasi 2D dan 3D, fotografi profesional, videografi dan editing, serta produksi konten untuk media digital dan sosial.</p><p>Program ini dilengkapi studio fotografi, ruang editing video berstandar profesional, dan laboratorium animasi. Siswa mendapatkan kesempatan magang di perusahaan media, periklanan, dan produksi kreatif terkemuka.</p><p>Peluang karir lulusan Multimedia sangat beragam: desainer grafis, animator, fotografer, videografer, content creator, motion graphic designer, hingga wirausaha di bidang kreatif digital.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Akuntansi dan Keuangan Lembaga',
            'description' => 'Program keahlian yang mempelajari prinsip akuntansi, pengelolaan keuangan, perpajakan, dan administrasi keuangan untuk berbagai jenis lembaga dan perusahaan.',
            'content' => '<p>Akuntansi dan Keuangan Lembaga (AKL) adalah program keahlian yang mempersiapkan siswa menjadi tenaga profesional di bidang keuangan dan akuntansi. Siswa akan mempelajari siklus akuntansi, laporan keuangan, perpajakan, sistem informasi akuntansi, serta pengelolaan kas dan bank.</p><p>Kurikulum AKL mengintegrasikan teori akuntansi dengan praktik menggunakan software akuntansi terkini seperti MYOB, Accurate, dan Microsoft Excel. Siswa juga diajarkan etika profesi akuntansi dan standar akuntansi keuangan Indonesia (SAK).</p><p>Lulusan AKL memiliki prospek karir yang cerah sebagai staf akuntansi, kasir, administrasi keuangan, asisten auditor, atau dapat melanjutkan studi ke jenjang D3/S1 Akuntansi.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Otomatisasi dan Tata Kelola Perkantoran',
            'description' => 'Program keahlian yang membekali siswa dengan kemampuan administrasi perkantoran, korespondensi, manajemen arsip, dan penggunaan teknologi perkantoran modern.',
            'content' => '<p>Otomatisasi dan Tata Kelola Perkantoran (OTKP) adalah program keahlian yang mencetak tenaga administrasi profesional yang siap kerja. Siswa akan menguasai korespondensi bisnis dalam bahasa Indonesia dan Inggris, manajemen arsip elektronik, layanan prima, serta pengoperasian berbagai perangkat kantor modern.</p><p>Program ini menekankan pada keterampilan komunikasi bisnis, pengelolaan rapat dan perjalanan dinas, administrasi kepegawaian, serta penggunaan aplikasi perkantoran Microsoft Office secara mahir. Siswa juga dilatih etiket dan tata krama profesional dalam lingkungan kerja.</p><p>Lulusan OTKP dapat berkarir sebagai sekretaris, staf administrasi, resepsionis, manajer kantor, atau operator telepon di berbagai perusahaan swasta maupun instansi pemerintah.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Bisnis Daring dan Pemasaran',
            'description' => 'Program keahlian yang mempelajari strategi pemasaran digital, e-commerce, manajemen media sosial, dan kewirausahaan untuk menghadapi era ekonomi digital.',
            'content' => '<p>Bisnis Daring dan Pemasaran (BDP) adalah program keahlian yang mempersiapkan siswa menjadi pelaku bisnis digital yang handal. Siswa akan mempelajari strategi pemasaran digital, pengelolaan toko online di berbagai platform marketplace, manajemen media sosial, fotografi produk, dan copywriting.</p><p>Kurikulum BDP mencakup digital marketing, SEO dan SEM, pengelolaan iklan berbayar di Google Ads dan Meta Ads, analitik bisnis digital, serta hukum bisnis dan etika perdagangan elektronik. Siswa juga didorong untuk membangun bisnis online mereka sendiri sejak di bangku sekolah.</p><p>Lulusan BDP memiliki bekal yang kuat untuk berkarir sebagai digital marketing specialist, social media manager, content creator, e-commerce manager, atau menjadi wirausahawan digital yang sukses.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Teknik Elektronika',
            'description' => 'Program keahlian yang mempelajari prinsip dasar elektronika, perakitan dan perbaikan perangkat elektronik, serta sistem kendali berbasis mikrokontroler dan IoT.',
            'content' => '<p>Teknik Elektronika adalah program keahlian yang membekali siswa dengan kemampuan analisis, perakitan, dan perbaikan sistem elektronika. Siswa akan mempelajari rangkaian listrik dan elektronika dasar, komponen elektronik, sistem digital, mikrokontroler Arduino dan Raspberry Pi, serta Internet of Things (IoT).</p><p>Program ini dilengkapi laboratorium elektronika yang lengkap dengan osiloskop, multimeter digital, dan berbagai peralatan ukur. Siswa mendapatkan pengalaman praktis melalui proyek-proyek nyata seperti pembuatan sistem alarm, robot sederhana, dan perangkat smart home.</p><p>Lulusan Teknik Elektronika dapat berkarir sebagai teknisi elektronika, teknisi telekomunikasi, IoT developer, teknisi industri, atau wirausaha di bidang jasa servis elektronik.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Tata Boga',
            'description' => 'Program keahlian yang mengembangkan kemampuan memasak, pastry, bakery, dan manajemen restoran untuk mempersiapkan siswa berkarir di industri kuliner dan perhotelan.',
            'content' => '<p>Tata Boga adalah program keahlian yang mempersiapkan siswa menjadi chef profesional dan pelaku industri kuliner yang kompeten. Siswa akan mempelajari teknik memasak makanan Indonesia dan internasional, pastry dan bakery, food and beverage service, serta manajemen dapur dan restoran.</p><p>Program ini didukung dapur praktik yang lengkap dengan peralatan memasak profesional, mulai dari kompor industri, oven konveksi, hingga peralatan pastry khusus. Siswa juga mendapatkan pelatihan penyajian makanan, dekorasi kue, dan standar keamanan pangan (food safety).</p><p>Peluang karir lulusan Tata Boga sangat menjanjikan: chef, pastry chef, food stylist, pengelola restoran, catering, atau membangun usaha kuliner sendiri. Lulusan juga dapat melanjutkan studi ke sekolah kuliner bertaraf internasional.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Tata Busana',
            'description' => 'Program keahlian yang mempelajari desain mode, teknik menjahit, pembuatan pola busana, dan kewirausahaan di bidang fashion untuk menghasilkan desainer dan penjahit profesional.',
            'content' => '<p>Tata Busana adalah program keahlian yang membekali siswa dengan keterampilan desain dan pembuatan busana secara profesional. Siswa akan mempelajari menggambar desain mode, membuat pola busana, teknik menjahit berbagai jenis busana, memilih dan mengelola bahan tekstil, serta bisnis fashion.</p><p>Program ini dilengkapi ruang jahit dengan mesin jahit industri, mesin obras, dan mesin bordir. Siswa juga belajar desain digital menggunakan software fashion design. Puncak pembelajaran adalah pergelaran fashion show yang menampilkan karya terbaik siswa setiap tahunnya.</p><p>Lulusan Tata Busana dapat berkarir sebagai desainer busana, penjahit profesional, stylist, pengelola butik, atau membuka usaha konveksi sendiri. Program ini juga membuka peluang karir di industri fashion nasional maupun internasional.</p>',
            'status' => MajorStatus::Public,
        ],
        [
            'title' => 'Keperawatan',
            'description' => 'Program keahlian yang mempersiapkan siswa dengan pengetahuan dan keterampilan dasar keperawatan untuk mendukung pelayanan kesehatan di berbagai fasilitas kesehatan.',
            'content' => '<p>Keperawatan adalah program keahlian yang membekali siswa dengan dasar-dasar ilmu keperawatan dan kesehatan. Siswa akan mempelajari anatomi dan fisiologi, prosedur keperawatan dasar, pertolongan pertama, kesehatan ibu dan anak, gizi dan kesehatan, serta etika profesi kesehatan.</p><p>Program ini dilengkapi laboratorium keperawatan dengan phantom dan peralatan medis standar untuk praktik. Siswa mendapatkan pengalaman praktik lapangan di puskesmas, klinik, dan rumah sakit mitra sekolah. Kurikulum mengikuti standar kompetensi yang ditetapkan Kementerian Kesehatan.</p><p>Lulusan Keperawatan dapat bekerja sebagai asisten perawat di rumah sakit, puskesmas, klinik, panti jompo, atau dapat melanjutkan studi ke jenjang D3/S1 Keperawatan untuk menjadi perawat profesional berlisensi.</p>',
            'status' => MajorStatus::Public,
        ],
    ];

    public function run(): void
    {
        foreach ($this->majors as $majorData) {
            Major::firstOrCreate(
                ['title' => $majorData['title']],
                $majorData,
            );
        }
    }
}
