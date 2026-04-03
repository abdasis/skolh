<?php

declare(strict_types=1);

namespace App\Exports;

use App\Models\AdmissionPeriod;
use App\Models\Registration;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

final class RegistrationsExport implements FromQuery, WithHeadings, WithMapping
{
    public function __construct(
        private readonly AdmissionPeriod $period,
    ) {}

    public function query(): Builder
    {
        return Registration::query()
            ->with('customValues')
            ->where('admission_period_id', $this->period->id)
            ->orderBy('registration_number');
    }

    /** @return array<int, string> */
    public function headings(): array
    {
        $standard = [
            'No. Pendaftaran', 'Status', 'Nama Lengkap', 'NIK', 'NISN',
            'Tempat Lahir', 'Tanggal Lahir', 'JK', 'Agama', 'Kewarganegaraan',
            'Alamat', 'RT', 'RW', 'Kelurahan', 'Kecamatan', 'Kota', 'Provinsi', 'Kode Pos',
            'No. HP', 'Email',
            'Nama Ayah', 'Pekerjaan Ayah', 'Penghasilan Ayah',
            'Nama Ibu', 'Pekerjaan Ibu', 'Penghasilan Ibu',
            'Sekolah Asal', 'NPSN', 'Tahun Lulus',
            'Tanggal Daftar',
        ];

        // Tambahkan kolom custom fields dari periode ini
        $customColumns = $this->period->customFields->pluck('label')->toArray();

        return array_merge($standard, $customColumns);
    }

    /**
     * @param Registration $row
     * @return array<int, mixed>
     */
    public function map($row): array
    {
        $standard = [
            $row->registration_number,
            $row->status->value,
            $row->full_name,
            $row->nik,
            $row->nisn,
            $row->birth_place,
            $row->birth_date?->format('d/m/Y'),
            $row->gender === 'L' ? 'Laki-laki' : 'Perempuan',
            $row->religion,
            $row->citizenship,
            $row->address_street,
            $row->address_rt,
            $row->address_rw,
            $row->address_village,
            $row->address_district,
            $row->address_city,
            $row->address_province,
            $row->address_postal_code,
            $row->phone,
            $row->email,
            $row->father_name,
            $row->father_occupation,
            $row->father_income,
            $row->mother_name,
            $row->mother_occupation,
            $row->mother_income,
            $row->previous_school_name,
            $row->previous_school_npsn,
            $row->graduation_year,
            $row->created_at?->format('d/m/Y H:i'),
        ];

        // Nilai custom fields per registrasi
        $customValues = $this->period->customFields->map(function ($field) use ($row) {
            $value = $row->customValues->first(fn ($cv) => $cv->custom_field_id === $field->id);

            return $value?->value ?? '';
        })->toArray();

        return array_merge($standard, $customValues);
    }
}
