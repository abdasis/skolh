import { type ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface RowAction<TData> {
    label: string;
    icon?: ReactNode;
    onClick: (row: TData) => void;
    variant?: 'default' | 'destructive';
    separator?: boolean;
}

interface DataTableRowActionsProps<TData> {
    row: TData;
    actions: RowAction<TData>[];
    label?: string;
}

export function DataTableRowActions<TData>({
    row,
    actions,
    label = 'Aksi',
}: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="data-[state=open]:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Buka menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actions.map((action, index) => (
                    <div key={index}>
                        {action.separator && index > 0 && <DropdownMenuSeparator />}
                        <DropdownMenuItem
                            onClick={() => action.onClick(row)}
                            className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                        >
                            {action.icon && (
                                <span className="mr-2 h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">
                                    {action.icon}
                                </span>
                            )}
                            {action.label}
                        </DropdownMenuItem>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
