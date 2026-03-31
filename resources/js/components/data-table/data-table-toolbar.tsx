"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    globalFilter: string
    onGlobalFilterChange: (value: string) => void
    searchPlaceholder?: string
}

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    onGlobalFilterChange,
    searchPlaceholder = "Cari...",
}: DataTableToolbarProps<TData>) {
    const filterableColumns = table
        .getAllColumns()
        .filter((col) => col.getCanFilter() && col.columnDef.enableColumnFilter)

    const hasActiveFilters = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={globalFilter}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                    className="h-8 w-full max-w-sm"
                />
                {filterableColumns.map((column) => (
                    <DataTableFacetedFilter
                        key={column.id}
                        column={column}
                        title={String(column.columnDef.header ?? column.id)}
                    />
                ))}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2"
                    >
                        Reset Filter
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
