import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as OrganizationNodeController from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { OrganizationNodeForm, type OrganizationNodeFormData } from './components/form';
import { type OrganizationNodeResource, type TeacherSelectOption } from '@/types';

interface Props {
    teachers: TeacherSelectOption[];
    parentOptions: OrganizationNodeResource[];
}

const AdminOrganizationNodesCreate = ({ teachers, parentOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Struktur Organisasi', href: OrganizationNodeController.index.url() },
            { title: 'Tambah Node', href: OrganizationNodeController.create.url() },
        ],
    });

    const form = useForm<OrganizationNodeFormData>({
        position: '',
        parent_id: '',
        teacher_id: '',
        name: '',
        nip: '',
        sort_order: 0,
        branch_side: 'center',
        connector_from: 'bottom',
        avatar: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(OrganizationNodeController.store.url(), { forceFormData: true });
    };

    return (
        <>
            <Head title="Tambah Node Organisasi" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Node Organisasi</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan jabatan baru ke struktur organisasi.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <OrganizationNodeForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Tambah Node"
                                cancelUrl={OrganizationNodeController.index.url()}
                                teachers={teachers}
                                parentOptions={parentOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrganizationNodesCreate;
