import { Head, useForm } from '@inertiajs/react';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import {
    UserForm,
    type UserFormData,
    type RoleOption,
} from './components/user-form';

interface Props {
    roles: RoleOption[];
}

const AdminUsersCreate = ({ roles }: Props) => {
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
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Tambah User</h1>
                        <p className="text-sm text-muted-foreground">
                            Buat akun pengguna baru untuk mengakses sistem.
                        </p>
                    </div>
                </div>

                <div className="px-2">
                    <div className="mx-auto max-w-5xl">
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <p className="text-base font-medium">
                                        Informasi Akun
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Isi data lengkap pengguna termasuk nama,
                                        email, password, dan role yang
                                        diberikan.
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="p-5">
                                    <UserForm
                                        form={form}
                                        roles={roles}
                                        onSubmit={handleSubmit}
                                        cancelHref={UserController.index.url()}
                                        submitLabel="Buat User"
                                        passwordRequired={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUsersCreate;

AdminUsersCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen User', href: UserController.index.url() },
        { title: 'Tambah User', href: UserController.create.url() },
    ],
};
