import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import * as ContactMessageController from '@/actions/App/Http/Controllers/Admin/ContactMessageController';
import { type ContactMessageResource } from '@/types';

interface Props {
    contactMessage: ContactMessageResource;
}

const AdminContactMessageShow = ({ contactMessage }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pesan Masuk', href: ContactMessageController.index.url() },
            { title: contactMessage.subject, href: ContactMessageController.show.url({ contact_message: contactMessage.id }) },
        ],
    });

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        router.delete(ContactMessageController.destroy.url({ contact_message: contactMessage.id }), {
            onFinish: () => setConfirmDelete(false),
        });
    };

    return (
        <>
            <Head title={`Pesan: ${contactMessage.subject}`} />

            <div className="flex flex-col gap-6 p-4 max-w-3xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">{contactMessage.subject}</h1>
                        <p className="text-sm text-muted-foreground">
                            {new Date(contactMessage.created_at).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={contactMessage.is_read ? 'secondary' : 'default'}>
                            {contactMessage.is_read ? 'Dibaca' : 'Belum Dibaca'}
                        </Badge>
                        <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
                            Hapus
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Pengirim</p>
                            <p className="font-medium">{contactMessage.name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <a href={`mailto:${contactMessage.email}`} className="font-medium text-primary hover:underline">
                                {contactMessage.email}
                            </a>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Pesan</p>
                        <p className="text-sm whitespace-pre-wrap">{contactMessage.message}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => router.visit(ContactMessageController.index.url())}>
                        Kembali ke Pesan Masuk
                    </Button>
                </div>
            </div>

            <ConfirmationDelete
                open={confirmDelete}
                onOpenChange={setConfirmDelete}
                onConfirm={handleDelete}
                title="Hapus Pesan"
                itemName={contactMessage.subject}
            />
        </>
    );
};

export default AdminContactMessageShow;
