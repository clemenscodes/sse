import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../button/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../form/form';
import { Input } from '../input/input';

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});

export type LoginProps = React.ComponentPropsWithoutRef<'form'>;

export const Login: React.FC<LoginProps> = ({ ...props }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
        } catch (error) {
            console.error(error);
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
