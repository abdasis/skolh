import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as ContactMessageController from '@/actions/App/Http/Controllers/Admin/ContactMessageController';
import { createContactMessageColumns } from './components/contact-message-columns';
import { ContactMessageStatsCards } from './components/contact-message-stats-cards';
import { type ContactMessageResource, type ContactMessageStats } from '@/types';

interface Props {
    contactMessages: ContactMessageResource[];
    filters: { search?: string };
    stats: ContactMessageStats;
}

const AdminContactMessagesIndex = ({ contactMessages, filters, stats }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pesan Masuk', href: ContactMessageController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<ContactMessageResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(ContactMessageController.destroy.url({ contact_message: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleView = (message: ContactMessageResource) => {
        router.visit(ContactMessageController.show.url({ contact_message: message.id }));
    };

    const columns = createContactMessageColumns(setToDelete, handleView);

    return (
        <>
            <Head title="Pesan Masuk" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Pesan Masuk</h1>
                        <p className="text-sm text-muted-foreground">Kelola pesan dari pengunjung website.</p>
                    </div>
                </div>

                <ContactMessageStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={contactMessages}
                        searchPlaceholder="Cari pesan..."
                        title="Daftar Pesan"
                        description="Semua pesan masuk dari pengunjung website."
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Pesan"
                itemName={toDelete?.subject}
            />
        </>
    );
};

export default AdminContactMessagesIndex;
