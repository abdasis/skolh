'use client';

import * as React from 'react';
import type { Table } from '@tanstack/react-table';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
}

export function DataTableViewOptions<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    const hidableColumns = table
        .getAllColumns()
        .filter((col) => col.getCanHide());

    const visibleCount = hidableColumns.filter((col) =>
        col.getIsVisible(),
    ).length;
    const isLastVisible = (colId: string) => {
        return (
            visibleCount === 1 &&
            hidableColumns.find((c) => c.id === colId)?.getIsVisible()
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                    <SlidersHorizontal className="size-3.5" />
                    <span>Kolom</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hidableColumns.map((column) => {
                    const disabled = !!isLastVisible(column.id);
                    return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => {
                                if (!disabled || value) {
                                    column.toggleVisibility(!!value);
                                }
                            }}
                            disabled={disabled}
                            className="capitalize"
                        >
                            {typeof column.columnDef.header === 'string'
                                ? column.columnDef.header
                                : ((
                                      column.columnDef.meta as
                                          | { label?: string }
                                          | undefined
                                  )?.label ?? column.id.replace(/_/g, ' '))}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
