import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

const Login = ({ status, canResetPassword, canRegister }: Props) => {
    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                {/* Header */}
                <div className="px-5 py-4">
                    <h2 className="font-heading text-base leading-snug font-medium">
                        Log in to your account
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below to log in
                    </p>
                </div>

                {/* Inner wrapper */}
                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Body */}
                                <div className="grid gap-5 p-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-sm"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember">
                                            Remember me
                                        </Label>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col gap-4 border-t border-foreground/6 bg-muted/30 px-5 py-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Log in
                                    </Button>

                                    {canRegister && (
                                        <p className="text-center text-sm text-muted-foreground">
                                            Don't have an account?{' '}
                                            <TextLink
                                                href={register()}
                                                tabIndex={5}
                                            >
                                                Sign up
                                            </TextLink>
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;

Login.layout = {
    title: '',
    description: '',
};
