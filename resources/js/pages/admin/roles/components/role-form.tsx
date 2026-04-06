import { type FormEventHandler } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export interface RoleFormData {
    name: string;
    permissions: number[];
}

interface GroupedPermission {
    id: number;
    name: string;
}

interface Props {
    form: InertiaFormProps<RoleFormData>;
    groupedPermissions: Record<string, GroupedPermission[]>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
}

const RoleForm = ({
    form,
    groupedPermissions,
    onSubmit,
    submitLabel = 'Simpan',
}: Props) => {
    const { data, setData, errors, processing } = form;

    const togglePermission = (id: number) => {
        const current = data.permissions;
        if (current.includes(id)) {
            setData(
                'permissions',
                current.filter((p) => p !== id),
            );
        } else {
            setData('permissions', [...current, id]);
        }
    };

    const toggleGroup = (permissions: GroupedPermission[]) => {
        const ids = permissions.map((p) => p.id);
        const allSelected = ids.every((id) => data.permissions.includes(id));
        if (allSelected) {
            setData(
                'permissions',
                data.permissions.filter((p) => !ids.includes(p)),
            );
        } else {
            const merged = Array.from(new Set([...data.permissions, ...ids]));
            setData('permissions', merged);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nama Role</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Contoh: editor"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <Label>Permissions</Label>
                {errors.permissions && (
                    <p className="text-sm text-destructive">
                        {errors.permissions}
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    {Object.entries(groupedPermissions).map(
                        ([module, permissions]) => {
                            const ids = permissions.map((p) => p.id);
                            const allSelected = ids.every((id) =>
                                data.permissions.includes(id),
                            );
                            const someSelected = ids.some((id) =>
                                data.permissions.includes(id),
                            );

                            return (
                                <div
                                    key={module}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="mb-3 flex items-center gap-2">
                                        <Checkbox
                                            id={`group-${module}`}
                                            checked={allSelected}
                                            data-state={
                                                someSelected && !allSelected
                                                    ? 'indeterminate'
                                                    : undefined
                                            }
                                            onCheckedChange={() =>
                                                toggleGroup(permissions)
                                            }
                                        />
                                        <Label
                                            htmlFor={`group-${module}`}
                                            className="cursor-pointer font-semibold capitalize"
                                        >
                                            {module}
                                        </Label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pl-6 sm:grid-cols-3">
                                        {permissions.map((permission) => (
                                            <div
                                                key={permission.id}
                                                className="flex items-center gap-2"
                                            >
                                                <Checkbox
                                                    id={`perm-${permission.id}`}
                                                    checked={data.permissions.includes(
                                                        permission.id,
                                                    )}
                                                    onCheckedChange={() =>
                                                        togglePermission(
                                                            permission.id,
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`perm-${permission.id}`}
                                                    className="cursor-pointer text-sm"
                                                >
                                                    {
                                                        permission.name.split(
                                                            ' ',
                                                        )[0]
                                                    }
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
};

export default RoleForm;
