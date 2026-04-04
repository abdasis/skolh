import { useState } from 'react';
import { Head, router, setLayoutProps, useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '@/components/form';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as RegistrationController from '@/actions/App/Http/Controllers/Admin/RegistrationController';
import { type AdmissionPeriod, type CustomField } from '@/types';

interface Props {
    periods: { data: AdmissionPeriod[] };
    activePeriod: AdmissionPeriod | null;
    selectedPeriod: AdmissionPeriod | null;
    customFields: { data: CustomField[] };
}

const RELIGION_OPTIONS = [
    'Islam',
    'Kristen',
    'Katolik',
    'Hindu',
    'Buddha',
    'Khonghucu',
].map((v) => ({ value: v, label: v }));
const EDUCATION_OPTIONS = [
    'SD',
    'SMP',
    'SMA',
    'D1',
    'D2',
    'D3',
    'D4',
    'S1',
    'S2',
    'S3',
].map((v) => ({ value: v, label: v }));
const INCOME_OPTIONS = [
    'Tidak Berpenghasilan',
    '< Rp 500.000',
    'Rp 500.000 - Rp 1.000.000',
    'Rp 1.000.000 - Rp 2.000.000',
    'Rp 2.000.000 - Rp 3.000.000',
    'Rp 3.000.000 - Rp 5.000.000',
    '> Rp 5.000.000',
].map((v) => ({ value: v, label: v }));
const GENDER_OPTIONS = [
    { value: 'L', label: 'Laki-laki' },
    { value: 'P', label: 'Perempuan' },
];

const SectionToggle = ({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <button
                type="button"
                className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                onClick={() => setOpen(!open)}
            >
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {title}
                </span>
                {open ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
            </button>
            {open && (
                <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const FileField = ({
    label,
    error,
    accept,
    onChange,
}: {
    label: string;
    error?: string;
    accept?: string;
    onChange: (file: File | null) => void;
}) => (
    <div className="grid gap-2">
        <Label>{label}</Label>
        <input
            type="file"
            accept={accept}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-xs file:font-medium focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:outline-none"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <InputError message={error} />
    </div>
);

const AdminRegistrationsCreate = ({
    periods,
    activePeriod,
    selectedPeriod,
    customFields,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            {
                title: 'Data Pendaftaran',
                href: RegistrationController.index.url(),
            },
            {
                title: 'Input Manual',
                href: RegistrationController.create.url(),
            },
        ],
    });

    const fields = customFields.data;

    const form = useForm<Record<string, string | number | null | File>>({
        admission_period_id: selectedPeriod?.id ?? activePeriod?.id ?? '',
        full_name: '',
        nik: '',
        nisn: '',
        birth_place: '',
        birth_date: '',
        gender: '',
        religion: '',
        citizenship: 'WNI',
        address_street: '',
        address_rt: '',
        address_rw: '',
        address_village: '',
        address_district: '',
        address_city: '',
        address_province: '',
        address_postal_code: '',
        living_arrangement: '',
        transportation: '',
        phone: '',
        email: '',
        birth_order: '',
        sibling_count: '',
        special_needs: '',
        height: '',
        weight: '',
        father_name: '',
        father_nik: '',
        father_birth_year: '',
        father_education: '',
        father_occupation: '',
        father_income: '',
        mother_name: '',
        mother_nik: '',
        mother_birth_year: '',
        mother_education: '',
        mother_occupation: '',
        mother_income: '',
        guardian_name: '',
        guardian_nik: '',
        guardian_birth_year: '',
        guardian_education: '',
        guardian_occupation: '',
        guardian_income: '',
        previous_school_name: '',
        previous_school_npsn: '',
        graduation_year: '',
        registration_photo: null,
        registration_id_document: null,
        ...Object.fromEntries(fields.map((f) => [`custom_fields.${f.id}`, ''])),
    });

    const str = (key: string) => (form.data[key] as string) ?? '';
    const err = (key: string) => (form.errors as Record<string, string>)[key];

    const handlePeriodChange = (periodId: string) => {
        router.get(
            RegistrationController.create.url(),
            { period_id: periodId },
            { preserveState: false },
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(RegistrationController.store.url());
    };

    const renderCustomField = (field: CustomField) => {
        const key = `custom_fields.${field.id}`;

        switch (field.type) {
            case 'select':
                return (
                    <FormSelect
                        key={field.id}
                        label={field.label}
                        required={field.is_required}
                        value={str(key)}
                        onValueChange={(v) => form.setData(key, v)}
                        options={(field.options ?? []).map((o) => ({
                            value: o,
                            label: o,
                        }))}
                        placeholder={field.placeholder ?? 'Pilih...'}
                        error={err(key)}
                    />
                );
            case 'textarea':
                return (
                    <FormTextarea
                        key={field.id}
                        label={field.label}
                        required={field.is_required}
                        value={str(key)}
                        placeholder={field.placeholder ?? ''}
                        onChange={(e) => form.setData(key, e.target.value)}
                        error={err(key)}
                        rows={3}
                    />
                );
            case 'file':
                return (
                    <FileField
                        key={field.id}
                        label={field.label}
                        error={err(key)}
                        onChange={(file) => form.setData(key, file)}
                    />
                );
            default:
                return (
                    <FormInput
                        key={field.id}
                        label={field.label}
                        required={field.is_required}
                        type={
                            field.type === 'date'
                                ? 'date'
                                : field.type === 'number'
                                  ? 'number'
                                  : 'text'
                        }
                        value={str(key)}
                        placeholder={field.placeholder ?? ''}
                        onChange={(e) => form.setData(key, e.target.value)}
                        error={err(key)}
                    />
                );
        }
    };

    return (
        <>
            <Head title="Input Manual Pendaftaran" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-start justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Input Manual Pendaftaran
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Isi data pendaftaran atas nama orang tua/calon
                            siswa.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select
                            onValueChange={handlePeriodChange}
                            defaultValue={(
                                selectedPeriod?.id ?? activePeriod?.id
                            )?.toString()}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Pilih Periode" />
                            </SelectTrigger>
                            <SelectContent>
                                {periods.data.map((p) => (
                                    <SelectItem
                                        key={p.id}
                                        value={p.id.toString()}
                                    >
                                        {p.academic_year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="px-2">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                        encType="multipart/form-data"
                    >
                        <SectionToggle title="A. Data Pribadi" defaultOpen>
                            <FormInput
                                label="Nama Lengkap"
                                required
                                value={str('full_name')}
                                placeholder="Sesuai KK/Akta"
                                onChange={(e) =>
                                    form.setData('full_name', e.target.value)
                                }
                                error={err('full_name')}
                            />
                            <FormInput
                                label="NIK"
                                required
                                value={str('nik')}
                                placeholder="16 digit"
                                maxLength={16}
                                onChange={(e) =>
                                    form.setData('nik', e.target.value)
                                }
                                error={err('nik')}
                            />
                            <FormInput
                                label="NISN"
                                value={str('nisn')}
                                placeholder="10 digit (jika ada)"
                                maxLength={10}
                                onChange={(e) =>
                                    form.setData('nisn', e.target.value)
                                }
                                error={err('nisn')}
                            />
                            <FormInput
                                label="Tempat Lahir"
                                required
                                value={str('birth_place')}
                                onChange={(e) =>
                                    form.setData('birth_place', e.target.value)
                                }
                                error={err('birth_place')}
                            />
                            <FormInput
                                label="Tanggal Lahir"
                                required
                                type="date"
                                value={str('birth_date')}
                                onChange={(e) =>
                                    form.setData('birth_date', e.target.value)
                                }
                                error={err('birth_date')}
                            />
                            <FormSelect
                                label="Jenis Kelamin"
                                required
                                value={str('gender')}
                                onValueChange={(v) => form.setData('gender', v)}
                                options={GENDER_OPTIONS}
                                placeholder="Pilih..."
                                error={err('gender')}
                            />
                            <FormSelect
                                label="Agama"
                                required
                                value={str('religion')}
                                onValueChange={(v) =>
                                    form.setData('religion', v)
                                }
                                options={RELIGION_OPTIONS}
                                placeholder="Pilih..."
                                error={err('religion')}
                            />
                            <FormInput
                                label="Kewarganegaraan"
                                required
                                value={str('citizenship')}
                                onChange={(e) =>
                                    form.setData('citizenship', e.target.value)
                                }
                                error={err('citizenship')}
                            />
                            <div className="sm:col-span-2">
                                <FormTextarea
                                    label="Alamat Jalan"
                                    required
                                    value={str('address_street')}
                                    onChange={(e) =>
                                        form.setData(
                                            'address_street',
                                            e.target.value,
                                        )
                                    }
                                    error={err('address_street')}
                                    rows={2}
                                />
                            </div>
                            <FormInput
                                label="RT"
                                value={str('address_rt')}
                                maxLength={3}
                                onChange={(e) =>
                                    form.setData('address_rt', e.target.value)
                                }
                                error={err('address_rt')}
                            />
                            <FormInput
                                label="RW"
                                value={str('address_rw')}
                                maxLength={3}
                                onChange={(e) =>
                                    form.setData('address_rw', e.target.value)
                                }
                                error={err('address_rw')}
                            />
                            <FormInput
                                label="Kelurahan/Desa"
                                required
                                value={str('address_village')}
                                onChange={(e) =>
                                    form.setData(
                                        'address_village',
                                        e.target.value,
                                    )
                                }
                                error={err('address_village')}
                            />
                            <FormInput
                                label="Kecamatan"
                                required
                                value={str('address_district')}
                                onChange={(e) =>
                                    form.setData(
                                        'address_district',
                                        e.target.value,
                                    )
                                }
                                error={err('address_district')}
                            />
                            <FormInput
                                label="Kota/Kabupaten"
                                required
                                value={str('address_city')}
                                onChange={(e) =>
                                    form.setData('address_city', e.target.value)
                                }
                                error={err('address_city')}
                            />
                            <FormInput
                                label="Provinsi"
                                required
                                value={str('address_province')}
                                onChange={(e) =>
                                    form.setData(
                                        'address_province',
                                        e.target.value,
                                    )
                                }
                                error={err('address_province')}
                            />
                            <FormInput
                                label="Kode Pos"
                                value={str('address_postal_code')}
                                maxLength={5}
                                onChange={(e) =>
                                    form.setData(
                                        'address_postal_code',
                                        e.target.value,
                                    )
                                }
                                error={err('address_postal_code')}
                            />
                            <FormInput
                                label="No. HP/Telepon"
                                value={str('phone')}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
                                }
                                error={err('phone')}
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                value={str('email')}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                error={err('email')}
                            />
                        </SectionToggle>

                        <SectionToggle title="B. Data Orang Tua - Ayah">
                            <FormInput
                                label="Nama Ayah"
                                required
                                value={str('father_name')}
                                onChange={(e) =>
                                    form.setData('father_name', e.target.value)
                                }
                                error={err('father_name')}
                            />
                            <FormInput
                                label="NIK Ayah"
                                value={str('father_nik')}
                                maxLength={16}
                                onChange={(e) =>
                                    form.setData('father_nik', e.target.value)
                                }
                                error={err('father_nik')}
                            />
                            <FormInput
                                label="Tahun Lahir"
                                type="number"
                                value={str('father_birth_year')}
                                min={1900}
                                max={new Date().getFullYear()}
                                onChange={(e) =>
                                    form.setData(
                                        'father_birth_year',
                                        e.target.value,
                                    )
                                }
                                error={err('father_birth_year')}
                            />
                            <FormSelect
                                label="Pendidikan Terakhir"
                                value={str('father_education')}
                                onValueChange={(v) =>
                                    form.setData('father_education', v)
                                }
                                options={EDUCATION_OPTIONS}
                                placeholder="Pilih..."
                                error={err('father_education')}
                            />
                            <FormInput
                                label="Pekerjaan"
                                value={str('father_occupation')}
                                onChange={(e) =>
                                    form.setData(
                                        'father_occupation',
                                        e.target.value,
                                    )
                                }
                                error={err('father_occupation')}
                            />
                            <FormSelect
                                label="Penghasilan"
                                value={str('father_income')}
                                onValueChange={(v) =>
                                    form.setData('father_income', v)
                                }
                                options={INCOME_OPTIONS}
                                placeholder="Pilih..."
                                error={err('father_income')}
                            />
                        </SectionToggle>

                        <SectionToggle title="C. Data Orang Tua - Ibu">
                            <FormInput
                                label="Nama Ibu"
                                required
                                value={str('mother_name')}
                                onChange={(e) =>
                                    form.setData('mother_name', e.target.value)
                                }
                                error={err('mother_name')}
                            />
                            <FormInput
                                label="NIK Ibu"
                                value={str('mother_nik')}
                                maxLength={16}
                                onChange={(e) =>
                                    form.setData('mother_nik', e.target.value)
                                }
                                error={err('mother_nik')}
                            />
                            <FormInput
                                label="Tahun Lahir"
                                type="number"
                                value={str('mother_birth_year')}
                                min={1900}
                                max={new Date().getFullYear()}
                                onChange={(e) =>
                                    form.setData(
                                        'mother_birth_year',
                                        e.target.value,
                                    )
                                }
                                error={err('mother_birth_year')}
                            />
                            <FormSelect
                                label="Pendidikan Terakhir"
                                value={str('mother_education')}
                                onValueChange={(v) =>
                                    form.setData('mother_education', v)
                                }
                                options={EDUCATION_OPTIONS}
                                placeholder="Pilih..."
                                error={err('mother_education')}
                            />
                            <FormInput
                                label="Pekerjaan"
                                value={str('mother_occupation')}
                                onChange={(e) =>
                                    form.setData(
                                        'mother_occupation',
                                        e.target.value,
                                    )
                                }
                                error={err('mother_occupation')}
                            />
                            <FormSelect
                                label="Penghasilan"
                                value={str('mother_income')}
                                onValueChange={(v) =>
                                    form.setData('mother_income', v)
                                }
                                options={INCOME_OPTIONS}
                                placeholder="Pilih..."
                                error={err('mother_income')}
                            />
                        </SectionToggle>

                        <SectionToggle title="D. Data Wali (Opsional)">
                            <FormInput
                                label="Nama Wali"
                                value={str('guardian_name')}
                                onChange={(e) =>
                                    form.setData(
                                        'guardian_name',
                                        e.target.value,
                                    )
                                }
                                error={err('guardian_name')}
                            />
                            <FormInput
                                label="Pekerjaan"
                                value={str('guardian_occupation')}
                                onChange={(e) =>
                                    form.setData(
                                        'guardian_occupation',
                                        e.target.value,
                                    )
                                }
                                error={err('guardian_occupation')}
                            />
                        </SectionToggle>

                        <SectionToggle title="E. Data Asal Sekolah (Opsional)">
                            <FormInput
                                label="Nama Sekolah"
                                value={str('previous_school_name')}
                                onChange={(e) =>
                                    form.setData(
                                        'previous_school_name',
                                        e.target.value,
                                    )
                                }
                                error={err('previous_school_name')}
                            />
                            <FormInput
                                label="NPSN"
                                value={str('previous_school_npsn')}
                                maxLength={8}
                                onChange={(e) =>
                                    form.setData(
                                        'previous_school_npsn',
                                        e.target.value,
                                    )
                                }
                                error={err('previous_school_npsn')}
                            />
                            <FormInput
                                label="Tahun Lulus"
                                type="number"
                                value={str('graduation_year')}
                                min={1990}
                                max={new Date().getFullYear() + 1}
                                onChange={(e) =>
                                    form.setData(
                                        'graduation_year',
                                        e.target.value,
                                    )
                                }
                                error={err('graduation_year')}
                            />
                        </SectionToggle>

                        <SectionToggle
                            title="F. Dokumen (Opsional)"
                            defaultOpen
                        >
                            <FileField
                                label="Pas Foto (JPG/PNG, maks 2MB)"
                                accept="image/jpeg,image/png,image/webp"
                                error={err('registration_photo')}
                                onChange={(file) =>
                                    form.setData('registration_photo', file)
                                }
                            />
                            <FileField
                                label="KTP/Akta Kelahiran (JPG/PNG/PDF, maks 2MB)"
                                accept="image/jpeg,image/png,application/pdf"
                                error={err('registration_id_document')}
                                onChange={(file) =>
                                    form.setData(
                                        'registration_id_document',
                                        file,
                                    )
                                }
                            />
                        </SectionToggle>

                        {fields.length > 0 && (
                            <SectionToggle title="G. Data Tambahan">
                                {fields.map(renderCustomField)}
                            </SectionToggle>
                        )}

                        <div className="mt-2 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    router.visit(
                                        RegistrationController.index.url(),
                                    )
                                }
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Menyimpan...' : 'Daftarkan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminRegistrationsCreate;
