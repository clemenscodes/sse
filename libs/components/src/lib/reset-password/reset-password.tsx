import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { post, ResetPasswordSchema, resetPasswordSchema } from '@utils';
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

export type ResetPasswordProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: ResetPasswordSchema) => Promise<void>;
    token: string;
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
    submit,
    token,
    ...props
}) => {
    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: ResetPasswordSchema) => {
        if (submit) {
            return submit(values);
        }
        try {
            await post(`/auth/reset-password/${token}`, values);
        } catch (e) {
            console.log(e);
        }
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
                    name='confirmPassword'
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
                    Reset Password
                </Button>
            </form>
        </Form>
    );
};

export default ResetPassword;
