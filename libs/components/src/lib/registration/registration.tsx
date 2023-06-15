import { RegisterReturn } from '@api';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { RegisterSchema, registerSchema } from '@types';
import { api, setJWTBearerToken } from '@utils';
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

export type RegisterProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: RegisterSchema) => Promise<void>;
};

export const Register: React.FC<RegisterProps> = ({ submit, ...props }) => {
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
        try {
            const { data, status } = await api.post<RegisterReturn>(
                '/auth/register',
                values
            );
            if (!data || status !== 200) {
                return null;
            }
            const { jwt } = data;
            if (!jwt) {
                return null;
            }
            setJWTBearerToken(jwt);
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    return (
        <div className='mx-auto w-full max-w-sm'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn('space-y-2')}
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
        </div>
    );
};

export default Register;
