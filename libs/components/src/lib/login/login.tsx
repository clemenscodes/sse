import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { loginSchema, type LoginSchema } from '@types';
import { useForm } from 'react-hook-form';
import { Button } from '../button/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../form/form';
import { Input } from '../input/input';

export type LoginProps = React.ComponentPropsWithoutRef<'form'>;

export const Login: React.FC<LoginProps> = ({ ...props }) => {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: LoginSchema) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('space-y-8')}
                {...props}
            >
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='username' {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your username to login.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};

export default Login;
