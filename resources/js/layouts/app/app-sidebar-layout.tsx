import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Toaster } from '@/components/ui/sonner';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </AppContent>
            <Toaster />
        </AppShell>
    );
}
