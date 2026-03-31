import { type CurriculumResource } from '@/types';

export interface CurriculumFormData {
    name: string;
    code: string;
    year: string;
    level: string;
    description: string;
    content: string;
    icon: string;
    status: string;
    effective_date: string;
    expired_date: string;
    document: File | null;
}

interface CurriculumFormProps {
    action: string;
    method: 'post' | 'put';
    curriculum?: CurriculumResource;
}

const CurriculumForm = ({ action, method, curriculum }: CurriculumFormProps) => {
    return null;
};

export { CurriculumForm };
