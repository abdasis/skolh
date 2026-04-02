import type {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from '@tanstack/react-table';

export type ProcessingMode = 'client' | 'server';

export interface DataTableState {
    globalFilter: string;
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
}

export interface FilterOption {
    label: string;
    value: string;
}

export interface ColumnMeta {
    filterVariant?: 'text' | 'select';
    filterOptions?: FilterOption[];
}

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        filterVariant?: 'text' | 'select';
        filterOptions?: FilterOption[];
        label?: string;
    }
}

export interface DataTableFilterSelect {
    type: 'select';
    key: string;
    label: string;
    placeholder?: string;
    options: FilterOption[];
    className?: string;
}

export interface DataTableFilterText {
    type: 'text';
    key: string;
    label: string;
    placeholder?: string;
    className?: string;
}

export interface DataTableFilterYearRange {
    type: 'year-range';
    key: string;
    label: string;
    placeholder?: string;
    from?: number;
    to?: number;
    className?: string;
}

export type DataTableFilter = DataTableFilterSelect | DataTableFilterText | DataTableFilterYearRange;

export interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    mode?: ProcessingMode;
    totalRows?: number;
    onStateChange?: (state: DataTableState) => void;
    isLoading?: boolean;
    searchPlaceholder?: string;
    title?: string;
    description?: string;
    filters?: DataTableFilter[];
    filterValues?: Record<string, string | undefined>;
    onFilterChange?: (key: string, value: string) => void;
}
