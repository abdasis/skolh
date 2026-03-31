"use client"

import * as React from "react"
import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff, Pin, PinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>
    title: string
    className?: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort() && !column.getCanPin()) {
        return <span className={cn("text-sm font-medium", className)}>{title}</span>
    }

    const isPinned = column.getIsPinned()

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {column.getCanSort() ? (
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                    onClick={() => {
                        if (column.getIsSorted() === "desc") {
                            column.clearSorting()
                        } else {
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    }}
                >
                    <span>{title}</span>
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-1 size-3.5" />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-1 size-3.5" />
                    ) : (
                        <ArrowUpDown className="ml-1 size-3.5 text-muted-foreground" />
                    )}
                </Button>
            ) : (
                <span className="text-sm font-medium">{title}</span>
            )}
            {column.getCanPin() && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    onClick={() => {
                        if (isPinned === "left") {
                            column.pin(false)
                        } else {
                            column.pin("left")
                        }
                    }}
                    title={isPinned === "left" ? "Lepas pin" : "Pin ke kiri"}
                >
                    {isPinned === "left" ? (
                        <PinOff className="size-3.5" />
                    ) : (
                        <Pin className="size-3.5 text-muted-foreground" />
                    )}
                </Button>
            )}
        </div>
    )
}
