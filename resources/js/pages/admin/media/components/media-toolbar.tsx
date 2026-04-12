import { useCallback, useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { Grid2X2, List, Trash2, Sparkles, Loader2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
    filters: { search: string; type: string };
    view: 'grid' | 'list';
    onViewChange: (v: 'grid' | 'list') => void;
    selectedCount: number;
    totalCount: number;
    hasOversizedImages: boolean;
    isOptimizing: boolean;
    onDeleteSelected: () => void;
    onOptimizeAll: () => void;
    onSelectAll: () => void;
    onClearSelection: () => void;
}

const TYPE_OPTIONS = [
    { value: 'all', label: 'Semua' },
    { value: 'images', label: 'Gambar' },
    { value: 'documents', label: 'Dokumen' },
];

export const MediaToolbar = ({
    filters,
    view,
    onViewChange,
    selectedCount,
    totalCount,
    hasOversizedImages,
    isOptimizing,
    onDeleteSelected,
    onOptimizeAll,
    onSelectAll,
    onClearSelection,
}: Props) => {
    const [searchValue, setSearchValue] = useState(filters.search ?? '');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setSearchValue(filters.search ?? '');
    }, [filters.search]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            router.get(
                '/admin/media',
                { search: val, type: filters.type },
                { preserveScroll: true, replace: true },
            );
        }, 350);
    }, [filters.type]);

    const handleTypeChange = useCallback((type: string) => {
        router.get(
            '/admin/media',
            { search: filters.search, type },
            { preserveScroll: true, replace: true },
        );
    }, [filters.search]);

    return (
        <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Cari file..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="w-56"
                />

                <div className="flex gap-1">
                    {TYPE_OPTIONS.map((opt) => (
                        <Button
                            key={opt.value}
                            variant={filters.type === opt.value || (opt.value === 'all' && !filters.type) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleTypeChange(opt.value)}
                        >
                            {opt.label}
                        </Button>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-2">
                    {hasOversizedImages && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onOptimizeAll}
                            disabled={isOptimizing}
                        >
                            {isOptimizing ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Sparkles className="size-4" />
                            )}
                            Optimalkan Semua
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewChange('grid')}
                        className={view === 'grid' ? 'bg-accent' : ''}
                        title="Tampilan grid"
                    >
                        <Grid2X2 className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewChange('list')}
                        className={view === 'list' ? 'bg-accent' : ''}
                        title="Tampilan list"
                    >
                        <List className="size-4" />
                    </Button>
                </div>
            </div>

            {totalCount > 0 && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <button
                        type="button"
                        onClick={selectedCount > 0 ? onClearSelection : onSelectAll}
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        {selectedCount > 0 ? (
                            <CheckSquare className="size-4" />
                        ) : (
                            <Square className="size-4" />
                        )}
                        {selectedCount > 0 ? `${selectedCount} dipilih` : 'Pilih semua'}
                    </button>

                    {selectedCount > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={onDeleteSelected}
                        >
                            <Trash2 className="size-4" />
                            Hapus ({selectedCount})
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
