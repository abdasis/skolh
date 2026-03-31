import { Head, useForm } from '@inertiajs/react';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import { UserForm, type UserFormData } from './components/user-form';

interface Props {
    roles: string[];
}

export default function AdminUsersCreate({ roles }: Props) {
    const form = useForm<UserFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        is_active: true,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.post(UserController.store.url());
    }

    return (
        <>
            <Head title="Tambah User" />

            <div className="flex flex-col gap-4 p-2">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Tambah User</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat akun pengguna baru.
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
                                    submitLabel="Buat User"
                                    passwordRequired={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminUsersCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen User', href: UserController.index.url() },
        { title: 'Tambah User', href: UserController.create.url() },
    ],
};
