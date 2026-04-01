'use client';

import type { Table } from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DataTableFooterProps<TData> {
    table: Table<TData>;
    pageIndex: number;
    pageSize: number;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const DataTableFooter = <TData,>({
    table,
    pageIndex,
    pageSize,
}: DataTableFooterProps<TData>) => {
    const rowCount = table.getRowCount();
    const pageCount = Math.ceil(rowCount / pageSize);
    const canPreviousPage = pageIndex > 0;
    const canNextPage = pageIndex < pageCount - 1;

    const from = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
    const to = Math.min((pageIndex + 1) * pageSize, rowCount);

    return (
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
                {rowCount === 0 ? (
                    'Tidak ada data'
                ) : (
                    <>
                        Menampilkan{' '}
                        <span className="font-medium text-foreground">
                            {from}–{to}
                        </span>{' '}
                        dari{' '}
                        <span className="font-medium text-foreground">
                            {rowCount}
                        </span>{' '}
                        data
                    </>
                )}
            </p>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs whitespace-nowrap text-muted-foreground">
                        Baris per halaman
                    </span>
                    <Select
                        value={String(pageSize)}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-7 w-16 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <SelectItem
                                    key={size}
                                    value={String(size)}
                                    className="text-xs"
                                >
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <span className="text-xs whitespace-nowrap text-muted-foreground">
                    Hal. {pageCount === 0 ? 0 : pageIndex + 1} dari {pageCount}
                </span>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!canPreviousPage}
                        title="Halaman pertama"
                    >
                        <ChevronsLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => table.previousPage()}
                        disabled={!canPreviousPage}
                        title="Halaman sebelumnya"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => table.nextPage()}
                        disabled={!canNextPage}
                        title="Halaman berikutnya"
                    >
                        <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        disabled={!canNextPage}
                        title="Halaman terakhir"
                    >
                        <ChevronsRight className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { DataTableFooter };
