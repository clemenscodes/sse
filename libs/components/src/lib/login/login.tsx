import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { type Auth } from '@types';
import {
    getSession,
    loginSchema,
    post,
    useSessionStore,
    type LoginSchema,
} from '@utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button } from '../button/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../form/form';
import { Input } from '../input/input';

export type LoginProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: LoginSchema) => Promise<void>;
    onLoginSuccess: (success: boolean) => void;
};

export const Login: React.FC<LoginProps> = ({
    submit,
    onLoginSuccess,
    ...props
}) => {
    const router = useRouter();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        if (submit) {
            return submit(values);
        }
        const { data, status } = await post<Auth, LoginSchema>(
            '/auth/login',
            values
        );
        if (!data || status !== 200) {
            return onLoginSuccess(false);
        }
        const { jwt } = data;
        if (!jwt) {
            return null;
        }
        useSessionStore.setState((state) => {
            return {
                ...state,
                jwt,
            };
        });
        const session = await getSession();
        useSessionStore.setState((state) => {
            return { ...state, session };
        });
        onLoginSuccess(true);
        router.push('/');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    'mx-auto mb-4 w-full max-w-sm space-y-2 rounded bg-white px-8 pb-8 pt-6'
                )}
                {...props}
            >
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    placeholder='Username'
                                    {...field}
                                    className='w-full border-2 border-gray-300'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    {...field}
                                    className='w-full border-2 border-gray-300'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-full'>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default Login;
