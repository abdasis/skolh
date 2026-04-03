export type RegistrationStatus = 'pending' | 'verified' | 'accepted' | 'rejected';

export type RegistrationCustomValue = {
    id: number;
    registration_id: number;
    custom_field_id: number | null;
    field_label: string;
    field_type: string;
    value: string | null;
};

export type Registration = {
    id: number;
    admission_period_id: number;
    registration_number: string;
    status: RegistrationStatus;
    full_name: string;
    nik: string;
    nisn: string | null;
    birth_place: string;
    birth_date: string;
    gender: 'L' | 'P';
    religion: string;
    citizenship: string;
    address_street: string;
    address_rt: string | null;
    address_rw: string | null;
    address_village: string;
    address_district: string;
    address_city: string;
    address_province: string;
    address_postal_code: string | null;
    living_arrangement: string | null;
    transportation: string | null;
    phone: string | null;
    email: string | null;
    birth_order: number | null;
    sibling_count: number | null;
    special_needs: string | null;
    height: number | null;
    weight: number | null;
    father_name: string;
    father_nik: string | null;
    father_birth_year: number | null;
    father_education: string | null;
    father_occupation: string | null;
    father_income: string | null;
    mother_name: string;
    mother_nik: string | null;
    mother_birth_year: number | null;
    mother_education: string | null;
    mother_occupation: string | null;
    mother_income: string | null;
    guardian_name: string | null;
    guardian_nik: string | null;
    guardian_birth_year: number | null;
    guardian_education: string | null;
    guardian_occupation: string | null;
    guardian_income: string | null;
    previous_school_name: string | null;
    previous_school_npsn: string | null;
    graduation_year: number | null;
    created_at: string;
    updated_at: string;
    custom_values?: RegistrationCustomValue[];
};

export type RegistrationDetail = Registration & {
    admission_period: import('./admission-period').AdmissionPeriod;
    custom_values: RegistrationCustomValue[];
    photo_url: string | null;
};

export type RegistrationStats = {
    total: number;
    pending: number;
    verified: number;
    accepted: number;
    rejected: number;
};
