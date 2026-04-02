"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import type { DataTableFilter } from "./types"

const MAX_VISIBLE_FILTERS = 3

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    globalFilter: string
    onGlobalFilterChange: (value: string) => void
    searchPlaceholder?: string
    filters?: DataTableFilter[]
    filterValues?: Record<string, string | undefined>
    onFilterChange?: (key: string, value: string) => void
}

const currentYear = new Date().getFullYear()

const DataTableToolbarFilter = ({
    filter,
    value,
    onChange,
}: {
    filter: DataTableFilter
    value: string
    onChange: (key: string, value: string) => void
}) => {
    if (filter.type === 'text') {
        return (
            <Input
                placeholder={filter.placeholder ?? `Filter ${filter.label}...`}
                value={value}
                onChange={(e) => onChange(filter.key, e.target.value)}
                className={filter.className ?? "h-8 w-40"}
            />
        )
    }

    if (filter.type === 'select') {
        return (
            <Select
                value={value || 'all'}
                onValueChange={(val) => onChange(filter.key, val === 'all' ? '' : val)}
            >
                <SelectTrigger className={filter.className ?? "h-8 w-40"}>
                    <SelectValue placeholder={filter.placeholder ?? filter.label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua {filter.label}</SelectItem>
                    {filter.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    if (filter.type === 'year-range') {
        const from = filter.from ?? 2010
        const to = filter.to ?? currentYear
        const years = Array.from({ length: to - from + 1 }, (_, i) => to - i)

        return (
            <Select
                value={value || 'all'}
                onValueChange={(val) => onChange(filter.key, val === 'all' ? '' : val)}
            >
                <SelectTrigger className={filter.className ?? "h-8 w-32"}>
                    <SelectValue placeholder={filter.placeholder ?? filter.label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua {filter.label}</SelectItem>
                    {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    return null
}

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    onGlobalFilterChange,
    searchPlaceholder = "Cari...",
    filters = [],
    filterValues = {},
    onFilterChange,
}: DataTableToolbarProps<TData>) {
    const [filtersOpen, setFiltersOpen] = React.useState(false)

    const filterableColumns = table
        .getAllColumns()
        .filter((col) => col.getCanFilter() && col.columnDef.enableColumnFilter)

    const totalFilterCount = filters.length + filterableColumns.length
    const isCollapsible = totalFilterCount > MAX_VISIBLE_FILTERS

    const hasActiveColumnFilters = table.getState().columnFilters.length > 0
    const activeExternalCount = Object.values(filterValues).filter((v) => v !== '' && v !== undefined).length
    const activeFilterCount = table.getState().columnFilters.length + activeExternalCount
    const hasActiveFilters = hasActiveColumnFilters || activeExternalCount > 0

    const handleResetAll = () => {
        table.resetColumnFilters()
        if (onFilterChange) {
            for (const filter of filters) {
                onFilterChange(filter.key, '')
            }
        }
    }

    const renderFilters = () => (
        <>
            {filters.map((filter) => (
                <DataTableToolbarFilter
                    key={filter.key}
                    filter={filter}
                    value={filterValues[filter.key] ?? ''}
                    onChange={onFilterChange ?? (() => {})}
                />
            ))}
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
                    onClick={handleResetAll}
                    className="h-8 gap-1 px-2"
                >
                    <X className="size-3.5" />
                    Reset
                </Button>
            )}
        </>
    )

    if (isCollapsible) {
        return (
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-2">
                        <Input
                            placeholder={searchPlaceholder}
                            value={globalFilter}
                            onChange={(e) => onGlobalFilterChange(e.target.value)}
                            className="h-8 w-full max-w-sm"
                        />
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <SlidersHorizontal className="size-3.5" />
                                Filter
                                {activeFilterCount > 0 && (
                                    <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                                        {activeFilterCount}
                                    </Badge>
                                )}
                            </Button>
                        </CollapsibleTrigger>
                        {hasActiveFilters && !filtersOpen && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleResetAll}
                                className="h-8 gap-1 px-2"
                            >
                                <X className="size-3.5" />
                                Reset
                            </Button>
                        )}
                    </div>
                    <DataTableViewOptions table={table} />
                </div>
                <CollapsibleContent>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {renderFilters()}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        )
    }

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={globalFilter}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                    className="h-8 w-full max-w-sm"
                />
                {renderFilters()}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
