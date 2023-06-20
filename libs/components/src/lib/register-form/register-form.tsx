import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { type Auth } from '@types';
import {
    getSession,
    post,
    registerSchema,
    useSessionStore,
    type RegisterSchema,
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
import { toast } from '../toast/useToast';

export type RegisterFormProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: RegisterSchema) => Promise<void>;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
    submit,
    ...props
}) => {
    const router = useRouter();
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const onSubmit = async (values: RegisterSchema) => {
        if (submit) {
            return submit(values);
        }
        const { data, status } = await post<Auth, RegisterSchema>(
            '/auth/register',
            values
        );
        if (!data || status !== 200) {
            toast({
                title: 'Failed registering',
                variant: 'destructive',
            });
            return null;
        }
        const { jwt } = data;
        if (!jwt) {
            toast({
                title: 'Failed registering',
                variant: 'destructive',
            });
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
        router.push('/note');
        toast({
            title: 'Successfully registered',
            description: `Welcome to notes, ${session?.username}`,
        });
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
                    name='email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder='Email'
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
                <FormField
                    control={form.control}
                    name='passwordConfirm'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Confirm Password'
                                    {...field}
                                    className='w-full border-2 border-gray-300'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-full'>
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
