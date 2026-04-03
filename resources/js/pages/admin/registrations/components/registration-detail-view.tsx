import { type RegistrationDetail } from '@/types';

interface Props {
    registration: RegistrationDetail;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b pb-1 dark:border-gray-800">
            {title}
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>
    </div>
);

const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{value ?? '-'}</span>
    </div>
);

const RegistrationDetailView = ({ registration: r }: Props) => (
    <div className="flex flex-col gap-6">
        <Section title="Data Pribadi">
            <Row label="Nama Lengkap" value={r.full_name} />
            <Row label="NIK" value={r.nik} />
            <Row label="NISN" value={r.nisn} />
            <Row label="Tempat, Tanggal Lahir" value={`${r.birth_place}, ${r.birth_date}`} />
            <Row label="Jenis Kelamin" value={r.gender === 'L' ? 'Laki-laki' : 'Perempuan'} />
            <Row label="Agama" value={r.religion} />
            <Row label="Kewarganegaraan" value={r.citizenship} />
            <div className="sm:col-span-2">
                <Row
                    label="Alamat"
                    value={[
                        r.address_street,
                        r.address_rt && r.address_rw ? `RT ${r.address_rt}/RW ${r.address_rw}` : null,
                        r.address_village,
                        `Kec. ${r.address_district}`,
                        r.address_city,
                        r.address_province,
                    ].filter(Boolean).join(', ')}
                />
            </div>
            <Row label="No. HP" value={r.phone} />
            <Row label="Email" value={r.email} />
        </Section>

        <Section title="Data Ayah">
            <Row label="Nama" value={r.father_name} />
            <Row label="Pekerjaan" value={r.father_occupation} />
            <Row label="Pendidikan" value={r.father_education} />
            <Row label="Penghasilan" value={r.father_income} />
        </Section>

        <Section title="Data Ibu">
            <Row label="Nama" value={r.mother_name} />
            <Row label="Pekerjaan" value={r.mother_occupation} />
            <Row label="Pendidikan" value={r.mother_education} />
            <Row label="Penghasilan" value={r.mother_income} />
        </Section>

        {r.guardian_name && (
            <Section title="Data Wali">
                <Row label="Nama" value={r.guardian_name} />
                <Row label="Pekerjaan" value={r.guardian_occupation} />
            </Section>
        )}

        {r.previous_school_name && (
            <Section title="Data Sekolah Asal">
                <Row label="Nama Sekolah" value={r.previous_school_name} />
                <Row label="NPSN" value={r.previous_school_npsn} />
                <Row label="Tahun Lulus" value={r.graduation_year} />
            </Section>
        )}

        {r.custom_values && r.custom_values.length > 0 && (
            <Section title="Data Tambahan">
                {r.custom_values.map(cv => (
                    <Row key={cv.id} label={cv.field_label} value={cv.value} />
                ))}
            </Section>
        )}
    </div>
);

export default RegistrationDetailView;
