import { Head, useForm, setLayoutProps } from '@inertiajs/react';
import { useCallback, useState, type FormEvent } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
    ChevronRight,
    ChevronDown,
    GripVertical,
    Plus,
    Trash2,
    ArrowRight,
    ArrowLeft,
} from 'lucide-react';
import type { SiteNavItem, FooterGroup } from '@/types/site-config';

interface FlatItem {
    item: SiteNavItem;
    depth: number;
    path: number[];
    expanded: boolean;
}

const MAX_DEPTH = 3;

const flattenItems = (
    items: SiteNavItem[],
    depth = 0,
    path: number[] = [],
    expandedIds: Set<string>,
): FlatItem[] => {
    const result: FlatItem[] = [];
    items.forEach((item, index) => {
        const currentPath = [...path, index];
        const hasChildren = (item.children?.length ?? 0) > 0;
        const expanded = expandedIds.has(item.id);
        result.push({ item, depth, path: currentPath, expanded });
        if (hasChildren && expanded) {
            result.push(
                ...flattenItems(
                    item.children!,
                    depth + 1,
                    currentPath,
                    expandedIds,
                ),
            );
        }
    });
    return result;
};

const getItemAtPath = (
    items: SiteNavItem[],
    path: number[],
): SiteNavItem | null => {
    if (path.length === 0) {
        return null;
    }
    if (path.length === 1) {
        return items[path[0]] ?? null;
    }
    const parent = items[path[0]];
    if (!parent?.children) {
        return null;
    }
    return getItemAtPath(parent.children, path.slice(1));
};

const setItemAtPath = (
    items: SiteNavItem[],
    path: number[],
    updater: (item: SiteNavItem) => SiteNavItem,
): SiteNavItem[] => {
    const result = [...items];
    if (path.length === 1) {
        result[path[0]] = updater(result[path[0]]);
        return result;
    }
    const parentIdx = path[0];
    result[parentIdx] = {
        ...result[parentIdx],
        children: setItemAtPath(
            result[parentIdx].children ?? [],
            path.slice(1),
            updater,
        ),
    };
    return result;
};

const removeItemAtPath = (
    items: SiteNavItem[],
    path: number[],
): SiteNavItem[] => {
    const result = [...items];
    if (path.length === 1) {
        result.splice(path[0], 1);
        return result;
    }
    const parentIdx = path[0];
    result[parentIdx] = {
        ...result[parentIdx],
        children: removeItemAtPath(
            result[parentIdx].children ?? [],
            path.slice(1),
        ),
    };
    return result;
};

const insertItemAtPath = (
    items: SiteNavItem[],
    path: number[],
    item: SiteNavItem,
): SiteNavItem[] => {
    const result = [...items];
    if (path.length === 1) {
        result.splice(path[0], 0, item);
        return result;
    }
    const parentIdx = path[0];
    result[parentIdx] = {
        ...result[parentIdx],
        children: insertItemAtPath(
            result[parentIdx].children ?? [],
            path.slice(1),
            item,
        ),
    };
    return result;
};

const reorderItems = (items: SiteNavItem[]): SiteNavItem[] => {
    return items.map((item, index) => ({
        ...item,
        order: index,
        children: item.children ? reorderItems(item.children) : undefined,
    }));
};

const generateId = () =>
    `nav_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

interface SortableNavItemProps {
    flatItem: FlatItem;
    index: number;
    onUpdate: (
        path: number[],
        field: keyof SiteNavItem,
        value: string | boolean,
    ) => void;
    onRemove: (path: number[]) => void;
    onToggleExpand: (id: string) => void;
    onIndent: (path: number[]) => void;
    onOutdent: (path: number[]) => void;
    canIndent: boolean;
    canOutdent: boolean;
}

const SortableNavItem = ({
    flatItem,
    index,
    onUpdate,
    onRemove,
    onToggleExpand,
    onIndent,
    onOutdent,
    canIndent,
    canOutdent,
}: SortableNavItemProps) => {
    const { item, depth, path, expanded } = flatItem;
    const hasChildren = (item.children?.length ?? 0) > 0;

    const { ref, handleRef, isDragging } = useSortable({
        id: item.id,
        index,
        group: 'nav-items',
    });

    return (
        <div
            ref={ref}
            className={`flex items-start gap-2 rounded border p-3 transition-opacity ${isDragging ? 'opacity-50' : ''}`}
            style={{ marginLeft: depth * 28 }}
        >
            <div
                ref={handleRef}
                className="mt-2 shrink-0 cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            {hasChildren ? (
                <button
                    type="button"
                    onClick={() => onToggleExpand(item.id)}
                    className="mt-2 shrink-0"
                >
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>
            ) : (
                <div className="w-4 shrink-0" />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
                <Input
                    value={item.label}
                    onChange={(e) => onUpdate(path, 'label', e.target.value)}
                    placeholder="Label"
                    className="flex-1"
                />
                <Input
                    value={item.href}
                    onChange={(e) => onUpdate(path, 'href', e.target.value)}
                    placeholder="URL / #anchor"
                    className="flex-1"
                />
            </div>

            <div className="flex shrink-0 items-center gap-1">
                <div className="flex items-center gap-1.5">
                    <Label
                        htmlFor={`visible-${item.id}`}
                        className="text-xs text-muted-foreground"
                    >
                        Tampil
                    </Label>
                    <Switch
                        id={`visible-${item.id}`}
                        checked={item.visible}
                        onCheckedChange={(checked) =>
                            onUpdate(path, 'visible', checked)
                        }
                    />
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onIndent(path)}
                    disabled={!canIndent}
                    title="Jadikan sub-menu"
                >
                    <ArrowRight className="h-3.5 w-3.5" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onOutdent(path)}
                    disabled={!canOutdent}
                    title="Keluarkan dari sub-menu"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onRemove(path)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
};

interface Props {
    headerItems: SiteNavItem[];
    footerGroups: FooterGroup[];
}

const NavigationPage = ({ headerItems, footerGroups }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Navigasi', href: '#' },
        ],
    });

    const { data, setData, put, processing, errors } = useForm({
        header_items: headerItems,
        footer_groups: footerGroups,
    });

    const [expandedIds, setExpandedIds] = useState<Set<string>>(
        () => new Set(),
    );

    const setHeaderItems = useCallback(
        (items: SiteNavItem[]) => {
            setData('header_items', reorderItems(items));
        },
        [setData],
    );

    const flatItems = flattenItems(data.header_items, 0, [], expandedIds);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/settings/navigation', { preserveScroll: true });
    };

    const handleUpdate = (
        path: number[],
        field: keyof SiteNavItem,
        value: string | boolean,
    ) => {
        const updated = setItemAtPath(data.header_items, path, (item) => ({
            ...item,
            [field]: value,
        }));
        setHeaderItems(updated);
    };

    const handleRemove = (path: number[]) => {
        const item = getItemAtPath(data.header_items, path);
        if (!item) {
            return;
        }
        let updated = removeItemAtPath(data.header_items, path);
        // Move children up to the removed item's parent level
        if (item.children && item.children.length > 0) {
            const parentPath = path.slice(0, -1);
            const insertIdx = path[path.length - 1];
            item.children.forEach((child, i) => {
                if (parentPath.length === 0) {
                    updated.splice(insertIdx + i, 0, {
                        ...child,
                        children: child.children ?? undefined,
                    });
                } else {
                    updated = insertItemAtPath(
                        updated,
                        [...parentPath, insertIdx + i],
                        child,
                    );
                }
            });
        }
        setHeaderItems(updated);
    };

    const handleAdd = () => {
        const newItem: SiteNavItem = {
            id: generateId(),
            label: '',
            href: '#',
            type: 'anchor',
            visible: true,
            order: data.header_items.length,
        };
        setHeaderItems([...data.header_items, newItem]);
    };

    const handleToggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleIndent = (path: number[]) => {
        // Move item as last child of the previous sibling
        const idx = path[path.length - 1];
        if (idx === 0) {
            return;
        }

        const parentPath = path.slice(0, -1);
        const siblings =
            parentPath.length === 0
                ? data.header_items
                : ((
                      getItemAtPath(
                          data.header_items,
                          parentPath,
                      ) as SiteNavItem & { children: SiteNavItem[] }
                  )?.children ?? []);

        const prevSibling = siblings[idx - 1];
        const currentDepth = path.length - 1;

        if (currentDepth + 1 >= MAX_DEPTH) {
            return;
        }

        const item = getItemAtPath(data.header_items, path);
        if (!item) {
            return;
        }

        let updated = removeItemAtPath(data.header_items, path);

        const prevSiblingPath = [...parentPath, idx - 1];
        updated = setItemAtPath(updated, prevSiblingPath, (prev) => ({
            ...prev,
            children: [...(prev.children ?? []), item],
        }));

        // Auto-expand parent
        setExpandedIds((prev) => new Set([...prev, prevSibling.id]));

        setHeaderItems(updated);
    };

    const handleOutdent = (path: number[]) => {
        if (path.length < 2) {
            return;
        }

        const item = getItemAtPath(data.header_items, path);
        if (!item) {
            return;
        }

        let updated = removeItemAtPath(data.header_items, path);

        const parentPath = path.slice(0, -1);
        const insertIdx = parentPath[parentPath.length - 1] + 1;
        const grandparentPath = parentPath.slice(0, -1);

        if (grandparentPath.length === 0) {
            updated.splice(insertIdx, 0, item);
        } else {
            updated = insertItemAtPath(
                updated,
                [...grandparentPath, insertIdx],
                item,
            );
        }

        setHeaderItems(updated);
    };

    const handleDragEnd = (
        ...args: Parameters<
            NonNullable<
                React.ComponentProps<typeof DragDropProvider>['onDragEnd']
            >
        >
    ) => {
        const [event] = args;
        const { source, target } = event.operation;
        if (!source || !target || source.id === target.id) {
            return;
        }

        const sourceIdx = flatItems.findIndex(
            (f) => f.item.id === String(source.id),
        );
        const targetIdx = flatItems.findIndex(
            (f) => f.item.id === String(target.id),
        );

        if (sourceIdx === -1 || targetIdx === -1) {
            return;
        }

        const sourceFlat = flatItems[sourceIdx];
        const targetFlat = flatItems[targetIdx];

        // Only allow reorder at the same depth and same parent
        if (sourceFlat.depth !== targetFlat.depth) {
            return;
        }

        const sourceParentPath = sourceFlat.path.slice(0, -1);
        const targetParentPath = targetFlat.path.slice(0, -1);

        if (sourceParentPath.join(',') !== targetParentPath.join(',')) {
            return;
        }

        const sourceIndex = sourceFlat.path[sourceFlat.path.length - 1];
        const targetIndex = targetFlat.path[targetFlat.path.length - 1];

        const getSiblings = (
            items: SiteNavItem[],
            parentPath: number[],
        ): SiteNavItem[] => {
            if (parentPath.length === 0) {
                return items;
            }
            const parent = getItemAtPath(items, parentPath);
            return parent?.children ?? [];
        };

        const siblings = [...getSiblings(data.header_items, sourceParentPath)];
        const [moved] = siblings.splice(sourceIndex, 1);
        siblings.splice(targetIndex, 0, moved);

        let updated = [...data.header_items];
        if (sourceParentPath.length === 0) {
            updated = siblings;
        } else {
            updated = setItemAtPath(updated, sourceParentPath, (parent) => ({
                ...parent,
                children: siblings,
            }));
        }

        setHeaderItems(updated);
    };

    return (
        <>
            <Head title="Navigasi" />
            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Navigasi</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola item menu header dan grup tautan footer.
                            Gunakan tombol panah untuk mengatur hierarki (maks.
                            3 level).
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 px-2"
                >
                    <div className="overflow-hidden rounded-2xl bg-linear-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center justify-between px-5 py-4">
                            <p className="text-base font-semibold">
                                Menu Header
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAdd}
                            >
                                <Plus className="mr-1.5 h-3.5 w-3.5" />
                                Tambah Menu
                            </Button>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-2 p-5">
                                {flatItems.length === 0 && (
                                    <p className="py-8 text-center text-sm text-muted-foreground">
                                        Belum ada item navigasi. Klik "Tambah
                                        Menu" untuk menambahkan.
                                    </p>
                                )}
                                <DragDropProvider onDragEnd={handleDragEnd}>
                                    {flatItems.map((flatItem, index) => {
                                        const canIndent =
                                            flatItem.path[
                                                flatItem.path.length - 1
                                            ] > 0 &&
                                            flatItem.depth < MAX_DEPTH - 1;
                                        const canOutdent = flatItem.depth > 0;

                                        return (
                                            <SortableNavItem
                                                key={flatItem.item.id}
                                                flatItem={flatItem}
                                                index={index}
                                                onUpdate={handleUpdate}
                                                onRemove={handleRemove}
                                                onToggleExpand={
                                                    handleToggleExpand
                                                }
                                                onIndent={handleIndent}
                                                onOutdent={handleOutdent}
                                                canIndent={canIndent}
                                                canOutdent={canOutdent}
                                            />
                                        );
                                    })}
                                </DragDropProvider>
                                {errors.header_items && (
                                    <p className="text-sm text-destructive">
                                        {errors.header_items}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-linear-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">
                                Grup Footer
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <div className="grid gap-6 sm:grid-cols-3">
                                    {data.footer_groups.map((group, gi) => (
                                        <div key={gi}>
                                            <p className="mb-2 text-sm font-semibold">
                                                {group.title}
                                            </p>
                                            <div className="space-y-2">
                                                {group.links.map((link, li) => (
                                                    <div
                                                        key={li}
                                                        className="flex gap-2"
                                                    >
                                                        <Input
                                                            value={link.label}
                                                            onChange={(e) => {
                                                                const groups = [
                                                                    ...data.footer_groups,
                                                                ];
                                                                const links = [
                                                                    ...groups[
                                                                        gi
                                                                    ].links,
                                                                ];
                                                                links[li] = {
                                                                    ...links[
                                                                        li
                                                                    ],
                                                                    label: e
                                                                        .target
                                                                        .value,
                                                                };
                                                                groups[gi] = {
                                                                    ...groups[
                                                                        gi
                                                                    ],
                                                                    links,
                                                                };
                                                                setData(
                                                                    'footer_groups',
                                                                    groups,
                                                                );
                                                            }}
                                                            placeholder="Label"
                                                            className="flex-1 text-xs"
                                                        />
                                                        <Input
                                                            value={link.href}
                                                            onChange={(e) => {
                                                                const groups = [
                                                                    ...data.footer_groups,
                                                                ];
                                                                const links = [
                                                                    ...groups[
                                                                        gi
                                                                    ].links,
                                                                ];
                                                                links[li] = {
                                                                    ...links[
                                                                        li
                                                                    ],
                                                                    href: e
                                                                        .target
                                                                        .value,
                                                                };
                                                                groups[gi] = {
                                                                    ...groups[
                                                                        gi
                                                                    ],
                                                                    links,
                                                                };
                                                                setData(
                                                                    'footer_groups',
                                                                    groups,
                                                                );
                                                            }}
                                                            placeholder="URL"
                                                            className="flex-1 text-xs"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Navigasi'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NavigationPage;
