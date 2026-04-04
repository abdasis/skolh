import { useEffect, useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { SearchIcon, XIcon } from 'lucide-react';
import * as StudentController from '@/actions/App/Http/Controllers/Admin/StudentController';

interface AcceptedRegistration {
    id: number;
    registration_number: string;
    full_name: string;
    academic_year: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ConvertFromSpmbDialog = ({ open, onOpenChange }: Props) => {
    const [registrations, setRegistrations] = useState<AcceptedRegistration[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [converting, setConverting] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!open) {
            return;
        }

        setLoading(true);
        setError(null);
        setSearch('');

        fetch(StudentController.acceptedRegistrations.url())
            .then((res) => res.json())
            .then((data: { data: AcceptedRegistration[] }) => {
                setRegistrations(data.data);
            })
            .catch(() => {
                setError('Gagal memuat data pendaftaran. Silakan coba lagi.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [open]);

    const filtered = useMemo(() => {
        if (!search.trim()) {
            return registrations;
        }
        const q = search.toLowerCase();
        return registrations.filter(
            (reg) =>
                reg.full_name.toLowerCase().includes(q) ||
                reg.registration_number.toLowerCase().includes(q) ||
                reg.academic_year.toLowerCase().includes(q),
        );
    }, [registrations, search]);

    const handleConvert = (id: number) => {
        setConverting(id);
        router.post(
            StudentController.convertFromSpmb.url(),
            { registration_id: id },
            {
                onFinish: () => setConverting(null),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
            >
                <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                            <DialogTitle>Konversi dari SPMB</DialogTitle>
                            <DialogDescription>
                                Pilih pendaftaran SPMB yang sudah diterima untuk dikonversi menjadi data siswa.
                            </DialogDescription>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                <XIcon className="size-4" />
                                <span className="sr-only">Tutup</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>

                    <div className="max-h-[70vh] overflow-y-auto">
                        <div className="p-5">
                            {/* Search */}
                            <div className="relative mb-4">
                                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nama, nomor pendaftaran, atau tahun ajaran..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* States */}
                            {loading && (
                                <div className="flex flex-col gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-16 animate-pulse rounded-xl bg-muted/60"
                                        />
                                    ))}
                                </div>
                            )}

                            {error && (
                                <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && registrations.length === 0 && (
                                <div className="rounded-xl border border-foreground/8 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
                                    Tidak ada pendaftaran SPMB yang siap dikonversi.
                                </div>
                            )}

                            {!loading && !error && registrations.length > 0 && filtered.length === 0 && (
                                <div className="rounded-xl border border-foreground/8 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
                                    Tidak ada hasil untuk &ldquo;{search}&rdquo;.
                                </div>
                            )}

                            {!loading && !error && filtered.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    {filtered.map((reg) => (
                                        <div
                                            key={reg.id}
                                            className="overflow-hidden rounded-xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                                        >
                                            <div className="overflow-hidden rounded-lg bg-background/90 ring-1 ring-foreground/6">
                                                <div className="flex items-center justify-between gap-3 px-4 py-3">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium">
                                                            {reg.full_name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            <span className="font-mono">{reg.registration_number}</span>
                                                            {' '}&middot;{' '}
                                                            {reg.academic_year}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="shrink-0"
                                                        disabled={converting === reg.id}
                                                        onClick={() => handleConvert(reg.id)}
                                                    >
                                                        {converting === reg.id ? 'Mengkonversi...' : 'Konversi'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                        <DialogClose asChild>
                            <Button variant="outline">Tutup</Button>
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConvertFromSpmbDialog;
