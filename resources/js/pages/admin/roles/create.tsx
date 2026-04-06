import { Head, useForm } from '@inertiajs/react';
import * as RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import type { Permission } from '@/types';
import RoleForm, { type RoleFormData } from './components/role-form';

interface Props {
    permissions: Permission[];
    grouped_permissions: Record<string, Array<{ id: number; name: string }>>;
}

const AdminRolesCreate = ({ grouped_permissions }: Props) => {
    const form = useForm<RoleFormData>({
        name: '',
        permissions: [],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(RoleController.store.url());
    };

    return (
        <>
            <Head title="Tambah Role" />

            <div className="flex flex-col gap-4 p-2">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Tambah Role</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat role baru dengan permission yang sesuai.
                    </p>
                </div>

                <div className="p-4">
                    <div className="max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <RoleForm
                                    form={form}
                                    groupedPermissions={grouped_permissions}
                                    onSubmit={handleSubmit}
                                    submitLabel="Buat Role"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRolesCreate;

AdminRolesCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen Role', href: RoleController.index.url() },
        { title: 'Tambah Role', href: RoleController.create.url() },
    ],
};
