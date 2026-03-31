import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { icons, type LucideIcon } from 'lucide-react';
import { createElement, useMemo, useState } from 'react';
import { FormLabel } from './form-label';

const ICONS_PER_PAGE = 60;

const iconEntries = Object.entries(icons) as [string, LucideIcon][];

const toKebab = (name: string): string =>
    name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

interface FormIconPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    description?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const FormIconPicker = ({
    label,
    value,
    onChange,
    error,
    description,
    id,
    required,
    disabled,
    className,
}: FormIconPickerProps) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const filtered = useMemo(() => {
        if (!search.trim()) return iconEntries;
        const q = search.toLowerCase();
        return iconEntries.filter(([name]) => name.toLowerCase().includes(q));
    }, [search]);

    const totalPages = Math.ceil(filtered.length / ICONS_PER_PAGE);
    const paged = filtered.slice(page * ICONS_PER_PAGE, (page + 1) * ICONS_PER_PAGE);

    const selectedIcon = value ? icons[value as keyof typeof icons] : null;

    const handleSelect = (name: string) => {
        onChange(name);
        setOpen(false);
        setSearch('');
        setPage(0);
    };

    const handleSearchChange = (val: string) => {
        setSearch(val);
        setPage(0);
    };

    return (
        <div className="grid gap-2">
            <FormLabel htmlFor={inputId} required={required}>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={inputId}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn(
                            'w-full justify-start gap-2 font-normal',
                            !value && 'text-muted-foreground',
                            error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
                            className,
                        )}
                    >
                        {selectedIcon ? (
                            <>
                                {createElement(selectedIcon, { className: 'size-4 shrink-0' })}
                                <span className="truncate">{toKebab(value)}</span>
                            </>
                        ) : (
                            <span>Pilih icon...</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="border-b p-2">
                        <Input
                            placeholder="Cari icon..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="h-8"
                            autoFocus
                        />
                    </div>
                    <ScrollArea className="h-64">
                        {paged.length === 0 ? (
                            <p className="text-muted-foreground p-4 text-center text-sm">Tidak ada icon ditemukan.</p>
                        ) : (
                            <div className="grid grid-cols-6 gap-1 p-2">
                                {paged.map(([name, Icon]) => (
                                    <button
                                        key={name}
                                        type="button"
                                        title={toKebab(name)}
                                        onClick={() => handleSelect(name)}
                                        className={cn(
                                            'flex size-10 items-center justify-center rounded-md transition-colors hover:bg-accent',
                                            value === name && 'bg-primary text-primary-foreground hover:bg-primary/90',
                                        )}
                                    >
                                        {createElement(Icon, { className: 'size-4' })}
                                    </button>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t px-2 py-1.5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="h-7 text-xs"
                            >
                                Sebelumnya
                            </Button>
                            <span className="text-muted-foreground text-xs">
                                {page + 1} / {totalPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                                className="h-7 text-xs"
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
            {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
            <InputError message={error} />
        </div>
    );
};

export { FormIconPicker };
export type { FormIconPickerProps };
