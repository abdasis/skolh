import { Head, router } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/actions/App/Http/Controllers/InstallController';
import type { InstallerSeeder } from '@/types';
import { useState } from 'react';

type Props = {
    seeders: InstallerSeeder[];
    errors?: Record<string, string>;
};

type StepId = 'admin' | 'school' | 'seeders';

type FormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    school_name: string;
    tagline: string;
};

const STEPS: { id: StepId; label: string }[] = [
    { id: 'admin', label: 'Akun Admin' },
    { id: 'school', label: 'Identitas Sekolah' },
    { id: 'seeders', label: 'Data Awal' },
];

const Install = ({ seeders, errors = {} }: Props) => {
    const groups = seeders.reduce<Record<string, InstallerSeeder[]>>((acc, seeder) => {
        if (!acc[seeder.group]) {
            acc[seeder.group] = [];
        }
        acc[seeder.group].push(seeder);
        return acc;
    }, {});

    const visibleSteps = seeders.length > 0 ? STEPS : STEPS.filter((s) => s.id !== 'seeders');
    const [currentStep, setCurrentStep] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [selectedSeeders, setSelectedSeeders] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        school_name: '',
        tagline: '',
    });

    const isLastStep = currentStep === visibleSteps.length - 1;
    const totalSteps = visibleSteps.length;
    const stepId = visibleSteps[currentStep].id;

    const updateField = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleSeeder = (key: string) => {
        setSelectedSeeders((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
        );
    };

    const toggleGroup = (groupSeeders: InstallerSeeder[]) => {
        const groupKeys = groupSeeders.map((s) => s.key);
        const allSelected = groupKeys.every((k) => selectedSeeders.includes(k));

        if (allSelected) {
            setSelectedSeeders((prev) => prev.filter((k) => !groupKeys.includes(k)));
        } else {
            setSelectedSeeders((prev) => [...new Set([...prev, ...groupKeys])]);
        }
    };

    const goNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goPrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLastStep) {
            goNext();
            return;
        }

        setProcessing(true);

        router.post(store.url(), {
            ...formData,
            seeders: selectedSeeders,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="w-full max-w-2xl">
            <Head title="Instalasi Aplikasi" />

            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="font-heading text-2xl font-semibold">Selamat Datang</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Lengkapi wizard instalasi untuk mulai menggunakan aplikasi
                </p>
            </div>

            {/* Step Indicator */}
            <div className="mb-6 flex items-center justify-center gap-2">
                {visibleSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div
                                className={[
                                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                                    index < currentStep
                                        ? 'bg-primary text-primary-foreground'
                                        : index === currentStep
                                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                                          : 'bg-muted text-muted-foreground',
                                ].join(' ')}
                            >
                                {index < currentStep ? (
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span
                                className={[
                                    'hidden text-xs font-medium sm:inline',
                                    index === currentStep ? 'text-foreground' : 'text-muted-foreground',
                                ].join(' ')}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < totalSteps - 1 && (
                            <div
                                className={[
                                    'h-px w-8 transition-colors',
                                    index < currentStep ? 'bg-primary' : 'bg-foreground/10',
                                ].join(' ')}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {errors.general && (
                            <div className="mx-5 mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                {errors.general}
                            </div>
                        )}

                        {/* Step: Akun Admin */}
                        {stepId === 'admin' && (
                            <>
                                <div className="border-b border-foreground/6 px-5 py-4">
                                    <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Akun Super Admin
                                    </h2>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Buat akun administrator utama untuk mengelola aplikasi.
                                    </p>
                                </div>

                                <div className="grid gap-5 p-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            autoComplete="name"
                                            placeholder="Nama administrator"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            placeholder="admin@sekolah.sch.id"
                                            value={formData.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <PasswordInput
                                                id="password"
                                                required
                                                autoComplete="new-password"
                                                placeholder="Min. 8 karakter"
                                                value={formData.password}
                                                onChange={(e) => updateField('password', e.target.value)}
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">
                                                Konfirmasi Password
                                            </Label>
                                            <PasswordInput
                                                id="password_confirmation"
                                                required
                                                autoComplete="new-password"
                                                placeholder="Ulangi password"
                                                value={formData.password_confirmation}
                                                onChange={(e) =>
                                                    updateField('password_confirmation', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step: Identitas Sekolah */}
                        {stepId === 'school' && (
                            <>
                                <div className="border-b border-foreground/6 px-5 py-4">
                                    <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Identitas Sekolah
                                    </h2>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Isi informasi dasar sekolah yang akan ditampilkan di aplikasi.
                                    </p>
                                </div>

                                <div className="grid gap-5 p-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="school_name">Nama Sekolah</Label>
                                        <Input
                                            id="school_name"
                                            type="text"
                                            required
                                            placeholder="Contoh: SMA Negeri 1 Kota"
                                            value={formData.school_name}
                                            onChange={(e) => updateField('school_name', e.target.value)}
                                        />
                                        <InputError message={errors.school_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tagline">Tagline</Label>
                                        <Input
                                            id="tagline"
                                            type="text"
                                            required
                                            placeholder="Contoh: Unggul, Berkarakter, Berprestasi"
                                            value={formData.tagline}
                                            onChange={(e) => updateField('tagline', e.target.value)}
                                        />
                                        <InputError message={errors.tagline} />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step: Data Awal */}
                        {stepId === 'seeders' && (
                            <>
                                <div className="border-b border-foreground/6 px-5 py-4">
                                    <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Data Awal (Opsional)
                                    </h2>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Pilih data contoh yang ingin dipasang. Role dan permission akan
                                        otomatis dibuat.
                                    </p>
                                </div>

                                <div className="grid gap-6 p-5">
                                    {Object.entries(groups).map(([group, groupSeeders]) => {
                                        const groupKeys = groupSeeders.map((s) => s.key);
                                        const allSelected = groupKeys.every((k) =>
                                            selectedSeeders.includes(k),
                                        );

                                        return (
                                            <div key={group}>
                                                <div className="mb-3 flex items-center justify-between">
                                                    <h3 className="text-sm font-medium">{group}</h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleGroup(groupSeeders)}
                                                        className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                                                    >
                                                        {allSelected ? 'Hapus semua' : 'Pilih semua'}
                                                    </button>
                                                </div>

                                                <div className="grid gap-2">
                                                    {groupSeeders.map((seeder) => {
                                                        const checked = selectedSeeders.includes(seeder.key);
                                                        return (
                                                            <label
                                                                key={seeder.key}
                                                                className="flex cursor-pointer items-start gap-3 rounded-lg border border-foreground/8 bg-muted/30 p-3 hover:bg-muted/50"
                                                            >
                                                                <Checkbox
                                                                    id={seeder.key}
                                                                    checked={checked}
                                                                    onCheckedChange={() =>
                                                                        toggleSeeder(seeder.key)
                                                                    }
                                                                    className="mt-0.5"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium leading-none">
                                                                        {seeder.label}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                                        {seeder.description}
                                                                    </p>
                                                                </div>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-3 border-t border-foreground/6 bg-muted/30 px-5 py-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={goPrev}
                                disabled={currentStep === 0}
                                className="min-w-24"
                            >
                                Kembali
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                Langkah {currentStep + 1} dari {totalSteps}
                            </p>

                            <Button type="submit" disabled={processing} className="min-w-24">
                                {processing && <Spinner />}
                                {processing
                                    ? 'Menginstal...'
                                    : isLastStep
                                      ? 'Mulai Instalasi'
                                      : 'Lanjut'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Install;
