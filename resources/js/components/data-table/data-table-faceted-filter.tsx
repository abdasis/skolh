"use client"

import * as React from "react"
import type { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { FilterOption } from "./types"

interface DataTableFacetedFilterProps<TData, TValue> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const filterVariant = column.columnDef.meta?.filterVariant ?? "text"
    const filterOptions: FilterOption[] = column.columnDef.meta?.filterOptions ?? []
    const filterValue = column.getFilterValue()

    const selectedValues = React.useMemo(() => {
        if (filterVariant === "select" && Array.isArray(filterValue)) {
            return new Set(filterValue as string[])
        }
        return new Set<string>()
    }, [filterValue, filterVariant])

    const activeCount = filterVariant === "select" ? selectedValues.size : (filterValue ? 1 : 0)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                    <PlusCircle className="size-3.5" />
                    <span>{title}</span>
                    {activeCount > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-1 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                {activeCount}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
                {filterVariant === "text" ? (
                    <Input
                        placeholder={`Filter ${title}...`}
                        value={(filterValue as string) ?? ""}
                        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                        className="h-8"
                    />
                ) : (
                    <div className="space-y-1">
                        {filterOptions.map((option) => {
                            const isSelected = selectedValues.has(option.value)
                            return (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                                        isSelected && "bg-accent/50"
                                    )}
                                    onClick={() => {
                                        const next = new Set(selectedValues)
                                        if (isSelected) {
                                            next.delete(option.value)
                                        } else {
                                            next.add(option.value)
                                        }
                                        column.setFilterValue(next.size > 0 ? Array.from(next) : undefined)
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "flex size-4 items-center justify-center rounded-sm border",
                                            isSelected
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : "border-muted-foreground/50"
                                        )}
                                    >
                                        {isSelected && <Check className="size-3" />}
                                    </div>
                                    <span>{option.label}</span>
                                </div>
                            )
                        })}
                        {filterOptions.length === 0 && (
                            <p className="py-2 text-center text-xs text-muted-foreground">
                                Tidak ada opsi tersedia.
                            </p>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
