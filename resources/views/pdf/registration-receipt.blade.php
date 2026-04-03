<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bukti Pendaftaran - {{ $registration->registration_number }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 11px; color: #000; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        .header h1 { font-size: 14px; font-weight: bold; text-transform: uppercase; }
        .header h2 { font-size: 12px; font-weight: bold; margin-top: 4px; }
        .reg-number { text-align: center; margin: 10px 0; font-size: 13px; font-weight: bold; border: 1px solid #000; padding: 6px; background: #f5f5f5; }
        .section-title { font-size: 11px; font-weight: bold; background: #e0e0e0; padding: 4px 8px; margin: 12px 0 6px; text-transform: uppercase; border-left: 3px solid #333; }
        table.data-table { width: 100%; border-collapse: collapse; }
        table.data-table td { padding: 3px 6px; vertical-align: top; }
        table.data-table td:first-child { width: 45%; font-weight: 500; }
        table.data-table td:nth-child(2) { width: 5%; text-align: center; }
        table.data-table td:last-child { width: 50%; }
        .row-odd { background: #fafafa; }
        .footer { margin-top: 30px; text-align: right; }
        .footer .signature-box { display: inline-block; text-align: center; }
        .footer .signature-line { margin-top: 60px; border-top: 1px solid #000; padding-top: 4px; width: 200px; }
        .status-badge { display: inline-block; padding: 2px 8px; border-radius: 3px; font-weight: bold; font-size: 10px; }
        .status-pending { background: #fff3cd; color: #856404; border: 1px solid #ffc107; }
        .status-verified { background: #cce5ff; color: #004085; border: 1px solid #007bff; }
        .status-accepted { background: #d4edda; color: #155724; border: 1px solid #28a745; }
        .status-rejected { background: #f8d7da; color: #721c24; border: 1px solid #dc3545; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Bukti Pendaftaran Peserta Didik Baru</h1>
        <h2>Tahun Ajaran {{ $registration->admissionPeriod->academic_year }}</h2>
    </div>

    <div class="reg-number">
        No. Pendaftaran: {{ $registration->registration_number }}
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Status:
        <span class="status-badge status-{{ $registration->status->value }}">
            {{ match($registration->status->value) {
                'pending' => 'Menunggu Verifikasi',
                'verified' => 'Terverifikasi',
                'accepted' => 'Diterima',
                'rejected' => 'Ditolak',
                default => $registration->status->value,
            } }}
        </span>
    </div>

    {{-- Bagian A: Data Pribadi --}}
    <div class="section-title">A. Data Pribadi</div>
    <table class="data-table">
        <tr class="row-odd"><td>Nama Lengkap</td><td>:</td><td>{{ $registration->full_name }}</td></tr>
        <tr><td>NIK</td><td>:</td><td>{{ $registration->nik }}</td></tr>
        <tr class="row-odd"><td>NISN</td><td>:</td><td>{{ $registration->nisn ?? '-' }}</td></tr>
        <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>{{ $registration->birth_place }}, {{ $registration->birth_date?->format('d/m/Y') }}</td></tr>
        <tr class="row-odd"><td>Jenis Kelamin</td><td>:</td><td>{{ $registration->gender === 'L' ? 'Laki-laki' : 'Perempuan' }}</td></tr>
        <tr><td>Agama</td><td>:</td><td>{{ $registration->religion }}</td></tr>
        <tr class="row-odd"><td>Kewarganegaraan</td><td>:</td><td>{{ $registration->citizenship }}</td></tr>
        <tr><td>Alamat</td><td>:</td><td>
            {{ $registration->address_street }}
            @if($registration->address_rt || $registration->address_rw)
                RT {{ $registration->address_rt ?? '-' }}/RW {{ $registration->address_rw ?? '-' }}
            @endif
            <br>
            {{ $registration->address_village }}, Kec. {{ $registration->address_district }}<br>
            {{ $registration->address_city }}, {{ $registration->address_province }}
            {{ $registration->address_postal_code ? '(' . $registration->address_postal_code . ')' : '' }}
        </td></tr>
        <tr class="row-odd"><td>No. HP/Telepon</td><td>:</td><td>{{ $registration->phone ?? '-' }}</td></tr>
        <tr><td>Email</td><td>:</td><td>{{ $registration->email ?? '-' }}</td></tr>
    </table>

    {{-- Bagian B: Data Ayah --}}
    <div class="section-title">B. Data Orang Tua - Ayah</div>
    <table class="data-table">
        <tr class="row-odd"><td>Nama Ayah</td><td>:</td><td>{{ $registration->father_name }}</td></tr>
        <tr><td>NIK Ayah</td><td>:</td><td>{{ $registration->father_nik ?? '-' }}</td></tr>
        <tr class="row-odd"><td>Tahun Lahir</td><td>:</td><td>{{ $registration->father_birth_year ?? '-' }}</td></tr>
        <tr><td>Pendidikan Terakhir</td><td>:</td><td>{{ $registration->father_education ?? '-' }}</td></tr>
        <tr class="row-odd"><td>Pekerjaan</td><td>:</td><td>{{ $registration->father_occupation ?? '-' }}</td></tr>
        <tr><td>Penghasilan</td><td>:</td><td>{{ $registration->father_income ?? '-' }}</td></tr>
    </table>

    {{-- Bagian C: Data Ibu --}}
    <div class="section-title">C. Data Orang Tua - Ibu</div>
    <table class="data-table">
        <tr class="row-odd"><td>Nama Ibu</td><td>:</td><td>{{ $registration->mother_name }}</td></tr>
        <tr><td>NIK Ibu</td><td>:</td><td>{{ $registration->mother_nik ?? '-' }}</td></tr>
        <tr class="row-odd"><td>Tahun Lahir</td><td>:</td><td>{{ $registration->mother_birth_year ?? '-' }}</td></tr>
        <tr><td>Pendidikan Terakhir</td><td>:</td><td>{{ $registration->mother_education ?? '-' }}</td></tr>
        <tr class="row-odd"><td>Pekerjaan</td><td>:</td><td>{{ $registration->mother_occupation ?? '-' }}</td></tr>
        <tr><td>Penghasilan</td><td>:</td><td>{{ $registration->mother_income ?? '-' }}</td></tr>
    </table>

    @if($registration->guardian_name)
    {{-- Bagian D: Data Wali --}}
    <div class="section-title">D. Data Wali</div>
    <table class="data-table">
        <tr class="row-odd"><td>Nama Wali</td><td>:</td><td>{{ $registration->guardian_name }}</td></tr>
        <tr><td>Pekerjaan</td><td>:</td><td>{{ $registration->guardian_occupation ?? '-' }}</td></tr>
    </table>
    @endif

    @if($registration->previous_school_name)
    {{-- Bagian E: Data Asal Sekolah --}}
    <div class="section-title">E. Data Asal Sekolah</div>
    <table class="data-table">
        <tr class="row-odd"><td>Nama Sekolah</td><td>:</td><td>{{ $registration->previous_school_name }}</td></tr>
        <tr><td>NPSN</td><td>:</td><td>{{ $registration->previous_school_npsn ?? '-' }}</td></tr>
        <tr class="row-odd"><td>Tahun Lulus</td><td>:</td><td>{{ $registration->graduation_year ?? '-' }}</td></tr>
    </table>
    @endif

    @if($registration->customValues->count() > 0)
    {{-- Bagian F: Data Tambahan --}}
    <div class="section-title">F. Data Tambahan</div>
    <table class="data-table">
        @foreach($registration->customValues as $i => $cv)
        <tr class="{{ $i % 2 === 0 ? 'row-odd' : '' }}">
            <td>{{ $cv->field_label }}</td>
            <td>:</td>
            <td>{{ $cv->value ?? '-' }}</td>
        </tr>
        @endforeach
    </table>
    @endif

    <div class="footer">
        <p>Tanggal Pendaftaran: {{ $registration->created_at->format('d/m/Y H:i') }}</p>
        <div class="signature-box">
            <p>Hormat saya,</p>
            <div class="signature-line">
                <strong>{{ $registration->full_name }}</strong>
            </div>
        </div>
    </div>
</body>
</html>
