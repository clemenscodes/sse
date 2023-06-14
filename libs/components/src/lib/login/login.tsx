import { apiUrl } from '@config';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { loginSchema, type LoginSchema } from '@types';
import axios from 'axios';
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

export const Login: React.FC<LoginProps> = ({ submit, onLoginSuccess, ...props }) => {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        try {
            if (submit) {
                return submit(values);
            }
            const { username, password } = values;
            const payload = { username, password };
            const url = `${apiUrl}/auth/login`;
            const session = await axios.post(url, payload);
            console.log({ session });

            if (session && session.status === 200) {
                onLoginSuccess(true);
            } else {
                onLoginSuccess(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mx-auto w-full max-w-sm'>
            <h2 className=''>Login</h2>
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
        </div>
    );
};

export default Login;
