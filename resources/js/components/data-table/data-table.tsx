'use client';

import * as React from 'react';
import {
    type ColumnDef,
    type ColumnFiltersState,
    type ColumnPinningState,
    type VisibilityState,
    type SortingState,
    type PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
} from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import type { DataTableProps, DataTableState } from './types';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableFooter } from './data-table-footer';

export function DataTable<TData>({
    columns,
    data,
    mode = 'client',
    totalRows,
    isLoading = false,
    searchPlaceholder = 'Cari...',
    onStateChange,
    initialState,
    debounceMs = 300,
    title,
    description,
    filters,
    filterValues,
    filterUrl,
}: DataTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = React.useState<string>(
        () => initialState?.globalFilter ?? '',
    );
    const [sorting, setSorting] = React.useState<SortingState>(
        () => initialState?.sorting ?? [],
    );
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        () => initialState?.columnFilters ?? [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnPinning, setColumnPinning] =
        React.useState<ColumnPinningState>({});
    const [pagination, setPagination] = React.useState<PaginationState>(() => {
        const savedPageSize = parseInt(
            localStorage.getItem('datatable_page_size') ?? '',
            10,
        );
        const pageSize =
            initialState?.pagination?.pageSize ??
            (Number.isFinite(savedPageSize) ? savedPageSize : 10);
        return { pageIndex: initialState?.pagination?.pageIndex ?? 0, pageSize };
    });

    React.useEffect(() => {
        localStorage.setItem(
            'datatable_page_size',
            String(pagination.pageSize),
        );
    }, [pagination.pageSize]);

    // Simpan callback di ref supaya perubahan identitas tidak memicu ulang efek
    // emisi di bawah — ini menghindari infinite loop saat parent tidak memoize.
    const onStateChangeRef = React.useRef(onStateChange);
    React.useEffect(() => {
        onStateChangeRef.current = onStateChange;
    }, [onStateChange]);

    const table = useReactTable({
        data: data ?? [],
        columns,
        state: {
            globalFilter,
            sorting,
            columnFilters,
            columnVisibility,
            columnPinning,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onPaginationChange: setPagination,
        rowCount: totalRows,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel:
            mode === 'client' ? getFilteredRowModel() : undefined,
        getSortedRowModel: mode === 'client' ? getSortedRowModel() : undefined,
        manualFiltering: mode === 'server',
        manualSorting: mode === 'server',
        manualPagination: mode === 'server',
    });

    // Skip emisi pertama (initial mount) — data untuk initial state sudah
    // datang dari server lewat initialState. Emit hanya saat user benar-benar
    // mengubah state (search, sort, paginate).
    const isFirstEmit = React.useRef(true);
    const lastSerialized = React.useRef<string>('');

    React.useEffect(() => {
        if (mode !== 'server') {
            return;
        }

        const serialized = JSON.stringify({
            globalFilter,
            sorting,
            columnFilters,
            pagination,
        });

        if (isFirstEmit.current) {
            isFirstEmit.current = false;
            lastSerialized.current = serialized;
            return;
        }

        // Guard terhadap re-render yang tidak mengubah state efektif
        // (misalnya parent re-render karena alasan lain).
        if (serialized === lastSerialized.current) {
            return;
        }
        lastSerialized.current = serialized;

        const timeoutId = setTimeout(() => {
            onStateChangeRef.current?.({
                globalFilter,
                sorting,
                columnFilters,
                pagination,
            } satisfies DataTableState);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [globalFilter, sorting, columnFilters, pagination, mode, debounceMs]);

    // Reset ke halaman 0 saat search/filter/sort berubah — standar UX datatable,
    // supaya user tidak "terdampar" di halaman kosong setelah memfilter.
    const isFirstResetCheck = React.useRef(true);
    React.useEffect(() => {
        if (mode !== 'server') {
            return;
        }
        if (isFirstResetCheck.current) {
            isFirstResetCheck.current = false;
            return;
        }
        setPagination((prev) =>
            prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 },
        );
    }, [globalFilter, sorting, columnFilters, mode]);

    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;

    return (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
            {(title || description) && (
                <div className="px-4 py-3">
                    {title && <p className="text-sm font-medium">{title}</p>}
                    {description && (
                        <p className="text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="overflow-x-auto rounded-xl bg-background/90 ring-1 ring-foreground/6">
                <div className="border-b border-foreground/6 px-2 py-3">
                    <DataTableToolbar
                        table={table}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                        searchPlaceholder={searchPlaceholder}
                        filters={filters}
                        filterValues={filterValues}
                        onFilterChange={
                            filterUrl
                                ? (key, value) => {
                                      router.get(
                                          filterUrl,
                                          {
                                              ...filterValues,
                                              [key]: value || undefined,
                                          },
                                          {
                                              preserveState: true,
                                              replace: true,
                                          },
                                      );
                                  }
                                : undefined
                        }
                        onResetAll={() => {
                            setGlobalFilter('');
                            if (filterUrl && filters?.length) {
                                const cleared = Object.fromEntries(
                                    filters.map((f) => [f.key, undefined]),
                                );
                                router.get(filterUrl, cleared, {
                                    preserveState: true,
                                    replace: true,
                                });
                            }
                        }}
                    />
                </div>
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isPinned =
                                        header.column.getIsPinned();
                                    const pinOffset =
                                        isPinned === 'left'
                                            ? header.column.getStart('left')
                                            : undefined;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                isPinned === 'left'
                                                    ? 'sticky z-10 bg-background'
                                                    : undefined
                                            }
                                            style={
                                                isPinned === 'left'
                                                    ? { left: pinOffset }
                                                    : undefined
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading || data === undefined ? (
                            Array.from({ length: pagination.pageSize }).map((_, i) => (
                                <TableRow key={i}>
                                    {columns.map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-4 w-full rounded-md" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const isPinned =
                                            cell.column.getIsPinned();
                                        const pinOffset =
                                            isPinned === 'left'
                                                ? cell.column.getStart('left')
                                                : undefined;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={
                                                    isPinned === 'left'
                                                        ? 'sticky z-10 bg-background'
                                                        : undefined
                                                }
                                                style={
                                                    isPinned === 'left'
                                                        ? { left: pinOffset }
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="py-16"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                                        <div className="rounded-2xl bg-muted/60 p-4 ring-1 ring-foreground/8">
                                            <svg
                                                className="h-10 w-10 text-muted-foreground/40"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 6h18" />
                                                <path d="M3 10h18" />
                                                <path d="M3 14h9" />
                                                <path d="M3 18h6" />
                                                <circle cx="18" cy="17" r="3" />
                                                <path d="m21 20-1.5-1.5" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                Belum ada data
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                Data akan muncul di sini setelah
                                                ditambahkan.
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTableFooter
                table={table}
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
            />
        </div>
    );
}
