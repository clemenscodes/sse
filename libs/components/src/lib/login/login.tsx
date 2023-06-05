import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

export type LoginProps = React.ComponentPropsWithoutRef<'form'>;

export const Login: React.FC<LoginProps> = ({ ...props }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
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
