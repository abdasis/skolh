import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import * as CustomFieldController from '@/actions/App/Http/Controllers/Admin/CustomFieldController';
import * as AdmissionPeriodController from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import { type AdmissionPeriod, type CustomField } from '@/types';

interface Props {
    activePeriod: AdmissionPeriod | null;
    fields: { data: CustomField[] };
    periods: { data: AdmissionPeriod[] };
}

const SortableFieldRow = ({
    field,
    index,
    onDelete,
}: {
    field: CustomField;
    index: number;
    onDelete: (field: CustomField) => void;
}) => {
    const { ref, isDragging } = useSortable({ id: field.id, index });

    return (
        <div
            ref={ref}
            className={`flex items-center justify-between rounded-md border p-3 bg-card transition-opacity ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="flex items-center gap-3">
                <span className="cursor-grab text-muted-foreground select-none">&#8597;</span>
                <div>
                    <p className="text-sm font-medium">{field.label}</p>
                    <p className="text-xs text-muted-foreground">{field.type}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {field.is_required && <Badge variant="secondary">Wajib</Badge>}
                <Button variant="ghost" size="sm" asChild>
                    <Link href={CustomFieldController.edit.url({ custom_field: field.id })}>Edit</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(field)}>
                    Hapus
                </Button>
            </div>
        </div>
    );
};

const AdminCustomFieldIndex = ({ activePeriod, fields, periods }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pengaturan SPMB', href: AdmissionPeriodController.index.url() },
            { title: 'Custom Fields', href: CustomFieldController.index.url() },
        ],
    });

    const [fieldList, setFieldList] = useState<CustomField[]>(fields?.data ?? []);
    const [toDelete, setToDelete] = useState<CustomField | null>(null);

    const handleDragEnd = (event: { operation: { source: { id: number | string } | null; target: { id: number | string } | null } }) => {
        const { source, target } = event.operation;
        if (!source || !target || source.id === target.id) return;

        const sourceIndex = fieldList.findIndex(f => f.id === source.id);
        const targetIndex = fieldList.findIndex(f => f.id === target.id);
        if (sourceIndex === -1 || targetIndex === -1) return;

        const updated = [...fieldList];
        const [moved] = updated.splice(sourceIndex, 1);
        updated.splice(targetIndex, 0, moved);
        const reordered = updated.map((f, i) => ({ ...f, sort_order: i }));
        setFieldList(reordered);

        router.post(
            CustomFieldController.reorder.url(),
            { order: reordered.map(f => ({ id: f.id, sort_order: f.sort_order })) },
            { preserveScroll: true },
        );
    };

    const handleDeleteConfirm = () => {
        if (!toDelete) return;
        router.delete(CustomFieldController.destroy.url({ custom_field: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    return (
        <>
            <Head title="Custom Fields SPMB" />

            <div className="flex flex-col gap-6 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Custom Fields</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola field tambahan untuk formulir pendaftaran{' '}
                            {activePeriod ? activePeriod.academic_year : ''}.
                        </p>
                    </div>
                    {activePeriod && (
                        <Button asChild>
                            <Link href={CustomFieldController.create.url()}>Tambah Field</Link>
                        </Button>
                    )}
                </div>

                {!activePeriod ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada periode aktif.{' '}
                                <Link
                                    href={AdmissionPeriodController.index.url()}
                                    className="underline underline-offset-4"
                                >
                                    Buat periode terlebih dahulu.
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Field</CardTitle>
                            <CardDescription>Seret untuk mengubah urutan tampil di formulir.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {fieldList.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Belum ada field tambahan. Klik "Tambah Field" untuk mulai.
                                </p>
                            ) : (
                                <DragDropProvider onDragEnd={handleDragEnd}>
                                    <div className="flex flex-col gap-2">
                                        {fieldList.map((field, idx) => (
                                            <SortableFieldRow
                                                key={field.id}
                                                field={field}
                                                index={idx}
                                                onDelete={setToDelete}
                                            />
                                        ))}
                                    </div>
                                </DragDropProvider>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            <ConfirmationDelete
                open={!!toDelete}
                onOpenChange={open => !open && setToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Field?"
                description={`Field "${toDelete?.label}" akan dihapus. Data yang sudah disubmit menggunakan field ini tetap tersimpan.`}
            />
        </>
    );
};

export default AdminCustomFieldIndex;
