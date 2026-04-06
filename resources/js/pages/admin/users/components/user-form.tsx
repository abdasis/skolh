import { type FormEventHandler } from 'react';
import { Link } from '@inertiajs/react';
import { type InertiaFormProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form/form-submit';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export interface RoleOption {
    name: string;
    permissions: number[];
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    is_active: boolean;
}

interface Props {
    form: InertiaFormProps<UserFormData>;
    roles: RoleOption[];
    onSubmit: FormEventHandler<HTMLFormElement>;
    onRoleChange?: (roleName: string, permissionIds: number[]) => void;
    cancelHref: string;
    submitLabel?: string;
    passwordRequired?: boolean;
}

export const UserForm = ({
    form,
    roles,
    onSubmit,
    onRoleChange,
    cancelHref,
    submitLabel = 'Simpan',
    passwordRequired = true,
}: Props) => {
    const { data, setData, errors, processing } = form;

    const handleRoleChange = (value: string) => {
        setData('role', value);
        if (onRoleChange) {
            const selected = roles.find((r) => r.name === value);
            onRoleChange(value, selected?.permissions ?? []);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nama</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama lengkap"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@contoh.com"
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">
                    Password{' '}
                    {!passwordRequired && '(kosongkan jika tidak diubah)'}
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder={
                        passwordRequired
                            ? 'Minimal 8 karakter'
                            : 'Biarkan kosong untuk tidak mengubah'
                    }
                />
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password_confirmation">
                    Konfirmasi Password
                </Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    placeholder="Ulangi password"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="role">Role</Label>
                <Select value={data.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.role && (
                    <p className="text-sm text-destructive">{errors.role}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                />
                <Label htmlFor="is_active">Akun Aktif</Label>
                {errors.is_active && (
                    <p className="text-sm text-destructive">
                        {errors.is_active}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelHref}>Batal</Link>
                </Button>
                <FormSubmit
                    processing={processing}
                    successful={form.recentlySuccessful}
                >
                    {submitLabel}
                </FormSubmit>
            </div>
        </form>
    );
};
