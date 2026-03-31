import { type ColumnDef } from '@tanstack/react-table';
import { type CurriculumResource } from '@/types';

interface CurriculumColumnsProps {
    onEdit: (curriculum: CurriculumResource) => void;
    onDelete: (curriculum: CurriculumResource) => void;
}

const createCurriculumColumns = ({ onEdit, onDelete }: CurriculumColumnsProps): ColumnDef<CurriculumResource>[] => {
    return [];
};

export { createCurriculumColumns, type CurriculumColumnsProps };
