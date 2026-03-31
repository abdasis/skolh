"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type ColumnPinningState,
    type VisibilityState,
    type SortingState,
    type PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import type { DataTableProps, DataTableState } from "./types"
import { DataTableToolbar } from "./data-table-toolbar"

export function DataTable<TData>({
    columns,
    data,
    mode = "client",
    isLoading = false,
    searchPlaceholder = "Cari...",
    onStateChange,
}: DataTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({})
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })

    const table = useReactTable({
        data,
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
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: mode === "client" ? getFilteredRowModel() : undefined,
        getSortedRowModel: mode === "client" ? getSortedRowModel() : undefined,
        manualFiltering: mode === "server",
        manualSorting: mode === "server",
        manualPagination: mode === "server",
    })

    React.useEffect(() => {
        if (mode === "server" && onStateChange) {
            const timeoutId = setTimeout(() => {
                onStateChange({
                    globalFilter,
                    sorting,
                    columnFilters,
                    pagination,
                } satisfies DataTableState)
            }, 300)
            return () => clearTimeout(timeoutId)
        }
    }, [globalFilter, sorting, columnFilters, pagination, mode, onStateChange])

    const headerGroups = table.getHeaderGroups()
    const rows = table.getRowModel().rows

    return (
        <div className="space-y-4">
            <DataTableToolbar
                table={table}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
                searchPlaceholder={searchPlaceholder}
            />
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isPinned = header.column.getIsPinned()
                                    const pinOffset = isPinned === "left" ? header.column.getStart("left") : undefined
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                isPinned === "left"
                                                    ? "sticky z-10 bg-background"
                                                    : undefined
                                            }
                                            style={
                                                isPinned === "left"
                                                    ? { left: pinOffset }
                                                    : undefined
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {columns.map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const isPinned = cell.column.getIsPinned()
                                        const pinOffset = isPinned === "left" ? cell.column.getStart("left") : undefined
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={
                                                    isPinned === "left"
                                                        ? "sticky z-10 bg-background"
                                                        : undefined
                                                }
                                                style={
                                                    isPinned === "left"
                                                        ? { left: pinOffset }
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
