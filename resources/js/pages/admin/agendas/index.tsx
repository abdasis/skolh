// TODO: Implement AgendaIndex page
// - Use app-sidebar-layout with breadcrumbs
// - Display table of agendas (date, title, description preview)
// - "Create" button linking to create page
// - Edit/delete actions per row using Wayfinder typed functions
// - Flash message display (success/error)
//
// Props contract (contracts/inertia-props.md):
// interface AgendaResource {
//     id: number;
//     date: string; // ISO date: "YYYY-MM-DD"
//     title: string;
//     description: string | null;
//     created_at: string;
//     updated_at: string;
// }
// interface AgendaIndexProps {
//     agendas: AgendaResource[];
// }
//
// Wayfinder import:
// import { index, create, edit, destroy } from '@/actions/App/Http/Controllers/Admin/AgendaController';
//
// Reference: resources/js/pages/admin/users/index.tsx
