import { Link, type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormImagePicker } from '@/components/form';
import { Button } from '@/components/ui/button';

interface EnumOption {
    value: string;
    label: string;
}

export interface StudentFormData {
    _method?: string;
    full_name: string;
    nis: string;
    nisn: string;
    nik: string;
    gender: string;
    religion: string;
    citizenship: string;
    birth_place: string;
    birth_date: string;
    address: string;
    phone: string;
    email: string;
    special_needs: string;
    enrollment_year: number | string;
    status: string;
    notes: string;
    father_name: string;
    father_occupation: string;
    father_phone: string;
    mother_name: string;
    mother_occupation: string;
    mother_phone: string;
    guardian_name: string;
    guardian_occupation: string;
    guardian_phone: string;
    photo_url: string | null;
}

interface Props {
    form: InertiaFormProps<StudentFormData>;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelUrl: string;
    statusOptions: EnumOption[];
}

const genderOptions: EnumOption[] = [
    { value: 'L', label: 'Laki-laki' },
    { value: 'P', label: 'Perempuan' },
];

const StudentForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelUrl,
    statusOptions,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* Data Pribadi */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Pribadi</h3>

                <FormInput
                    label="Nama Lengkap"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    placeholder="Nama lengkap siswa"
                    error={errors.full_name}
                    required
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="NIS"
                        value={data.nis}
                        onChange={(e) => setData('nis', e.target.value)}
                        placeholder="Nomor Induk Siswa"
                        error={errors.nis}
                    />
                    <FormInput
                        label="NISN"
                        value={data.nisn}
                        onChange={(e) => setData('nisn', e.target.value)}
                        placeholder="Nomor Induk Siswa Nasional"
                        error={errors.nisn}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="NIK"
                        value={data.nik}
                        onChange={(e) => setData('nik', e.target.value)}
                        placeholder="Nomor Induk Kependudukan"
                        error={errors.nik}
                    />
                    <FormSelect
                        label="Jenis Kelamin"
                        value={data.gender}
                        onValueChange={(value) => setData('gender', value)}
                        options={genderOptions}
                        placeholder="Pilih jenis kelamin"
                        error={errors.gender}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="Agama"
                        value={data.religion}
                        onChange={(e) => setData('religion', e.target.value)}
                        placeholder="Contoh: Islam"
                        error={errors.religion}
                    />
                    <FormInput
                        label="Kewarganegaraan"
                        value={data.citizenship}
                        onChange={(e) => setData('citizenship', e.target.value)}
                        placeholder="Contoh: WNI"
                        error={errors.citizenship}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="Tempat Lahir"
                        value={data.birth_place}
                        onChange={(e) => setData('birth_place', e.target.value)}
                        placeholder="Kota tempat lahir"
                        error={errors.birth_place}
                    />
                    <FormInput
                        label="Tanggal Lahir"
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        error={errors.birth_date}
                    />
                </div>

                <FormTextarea
                    label="Alamat"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    placeholder="Alamat lengkap"
                    rows={3}
                    error={errors.address}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="Nomor Telepon"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        error={errors.phone}
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="alamat@email.com"
                        error={errors.email}
                    />
                </div>

                <FormInput
                    label="Kebutuhan Khusus"
                    value={data.special_needs}
                    onChange={(e) => setData('special_needs', e.target.value)}
                    placeholder="Contoh: Tunanetra, Tunarungu, dll."
                    error={errors.special_needs}
                />
            </div>

            {/* Status Sekolah */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Status Sekolah</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        label="Tahun Masuk"
                        type="number"
                        value={String(data.enrollment_year)}
                        onChange={(e) => setData('enrollment_year', e.target.value)}
                        placeholder="Contoh: 2024"
                        error={errors.enrollment_year}
                        required
                    />
                    <FormSelect
                        label="Status"
                        value={data.status}
                        onValueChange={(value) => setData('status', value)}
                        options={statusOptions}
                        placeholder="Pilih status siswa"
                        error={errors.status}
                        required
                    />
                </div>

                <FormTextarea
                    label="Catatan"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Catatan tambahan dari admin"
                    rows={2}
                    error={errors.notes}
                />
            </div>

            {/* Orang Tua / Wali */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Orang Tua / Wali</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormInput
                        label="Nama Ayah"
                        value={data.father_name}
                        onChange={(e) => setData('father_name', e.target.value)}
                        placeholder="Nama lengkap ayah"
                        error={errors.father_name}
                    />
                    <FormInput
                        label="Pekerjaan Ayah"
                        value={data.father_occupation}
                        onChange={(e) => setData('father_occupation', e.target.value)}
                        placeholder="Pekerjaan"
                        error={errors.father_occupation}
                    />
                    <FormInput
                        label="Telepon Ayah"
                        value={data.father_phone}
                        onChange={(e) => setData('father_phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        error={errors.father_phone}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormInput
                        label="Nama Ibu"
                        value={data.mother_name}
                        onChange={(e) => setData('mother_name', e.target.value)}
                        placeholder="Nama lengkap ibu"
                        error={errors.mother_name}
                    />
                    <FormInput
                        label="Pekerjaan Ibu"
                        value={data.mother_occupation}
                        onChange={(e) => setData('mother_occupation', e.target.value)}
                        placeholder="Pekerjaan"
                        error={errors.mother_occupation}
                    />
                    <FormInput
                        label="Telepon Ibu"
                        value={data.mother_phone}
                        onChange={(e) => setData('mother_phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        error={errors.mother_phone}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormInput
                        label="Nama Wali"
                        value={data.guardian_name}
                        onChange={(e) => setData('guardian_name', e.target.value)}
                        placeholder="Nama lengkap wali (jika ada)"
                        error={errors.guardian_name}
                    />
                    <FormInput
                        label="Pekerjaan Wali"
                        value={data.guardian_occupation}
                        onChange={(e) => setData('guardian_occupation', e.target.value)}
                        placeholder="Pekerjaan"
                        error={errors.guardian_occupation}
                    />
                    <FormInput
                        label="Telepon Wali"
                        value={data.guardian_phone}
                        onChange={(e) => setData('guardian_phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        error={errors.guardian_phone}
                    />
                </div>
            </div>

            {/* Foto */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Foto</h3>

                <FormImagePicker
                    label="Foto Siswa"
                    value={data.photo_url}
                    onChange={(url) => setData('photo_url', url)}
                    folder="students/photos"
                    error={errors.photo_url}
                    previewClassName="h-32 w-24"
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
                </Button>
                <FormSubmit processing={processing} successful={recentlySuccessful}>
                    {submitLabel}
                </FormSubmit>
            </div>
        </form>
    );
};

export { StudentForm };
