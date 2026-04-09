import { Head } from '@inertiajs/react';
import { OrgChart } from '@/components/org-chart';
import PageHero from '@/themes/clean-emerald/components/page-hero';
import { type OrganizationNodeResource } from '@/types';

interface Props {
    nodes: OrganizationNodeResource[];
}

const PublicOrganizationPage = ({ nodes }: Props) => {
    return (
        <>
            <Head title="Struktur Organisasi" />

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <PageHero
                    badge="Organisasi"
                    title="Struktur"
                    highlight="Organisasi"
                    description="Bagan struktur organisasi sekolah."
                />

                <div className="mt-10">
                    <OrgChart nodes={nodes} />
                </div>
            </div>
        </>
    );
};

export default PublicOrganizationPage;
