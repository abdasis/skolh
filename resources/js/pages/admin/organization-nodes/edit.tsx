import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as OrganizationNodeController from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { OrganizationNodeForm, type OrganizationNodeFormData } from './components/form';
import { type OrganizationNodeResource, type TeacherSelectOption } from '@/types';

interface Props {
    node: OrganizationNodeResource;
    teachers: TeacherSelectOption[];
    parentOptions: OrganizationNodeResource[];
}

const AdminOrganizationNodesEdit = ({ node, teachers, parentOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Struktur Organisasi', href: OrganizationNodeController.index.url() },
            { title: 'Edit Node' },
        ],
    });

    const form = useForm<OrganizationNodeFormData>({
        _method: 'PUT',
        position: node.position,
        parent_id: node.parent_id !== null ? String(node.parent_id) : '',
        teacher_id: node.teacher_id !== null ? String(node.teacher_id) : '',
        name: node.name ?? '',
        nip: node.nip ?? '',
        sort_order: node.sort_order,
        branch_side: node.branch_side,
        connector_from: node.connector_from,
        avatar: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(OrganizationNodeController.update.url({ organization_node: node.id }), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Node Organisasi" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Node Organisasi</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data jabatan dalam struktur organisasi.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <OrganizationNodeForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Perubahan"
                                cancelUrl={OrganizationNodeController.index.url()}
                                teachers={teachers}
                                parentOptions={parentOptions}
                                currentNodeId={node.id}
                                existingAvatarUrl={node.avatar_url}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrganizationNodesEdit;
