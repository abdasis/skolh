import { Head, useForm } from '@inertiajs/react';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import type { User } from '@/types/auth';
import { UserForm, type UserFormData } from './components/user-form';

interface Props {
    user: User;
    roles: string[];
}

export default function AdminUsersEdit({ user, roles }: Props) {
    const form = useForm<UserFormData>({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.roles?.[0]?.name ?? '',
        is_active: user.is_active,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.put(UserController.update.url({ user: user.id }));
    }

    return (
        <>
            <Head title="Edit User" />

            <div className="flex flex-col gap-4 p-2">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Edit User</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data pengguna.
                    </p>
                </div>

                <div className="p-4">
                    <div className="max-w-lg overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <UserForm
                                    form={form}
                                    roles={roles}
                                    onSubmit={handleSubmit}
                                    submitLabel="Simpan Perubahan"
                                    passwordRequired={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminUsersEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen User', href: UserController.index.url() },
        { title: 'Edit User', href: '#' },
    ],
};
