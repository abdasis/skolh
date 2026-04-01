import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

const Register = () => {
    return (
        <>
            <Head title="Register" />

            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                {/* Header */}
                <div className="px-5 py-4">
                    <h2 className="font-heading text-base leading-snug font-medium">
                        Create an account
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your details below to create your account
                    </p>
                </div>

                {/* Inner wrapper */}
                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Body */}
                                <div className="grid gap-5 p-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Full name"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm password
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Confirm password"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col gap-4 border-t border-foreground/6 bg-muted/30 px-5 py-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner />}
                                        Create account
                                    </Button>

                                    <p className="text-center text-sm text-muted-foreground">
                                        Already have an account?{' '}
                                        <TextLink href={login()} tabIndex={6}>
                                            Log in
                                        </TextLink>
                                    </p>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Register;

Register.layout = {
    title: '',
    description: '',
};
