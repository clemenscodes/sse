import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { useForm } from 'react-hook-form';
import {
    resetPasswordSchema,
    type ResetPasswordSchema,
} from '../../../../utils/src/lib/models/resetPasswordSchema';
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
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
    submit,
    ...props
}) => {
    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (values: ResetPasswordSchema) => {
        if (submit) {
            return submit(values);
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
                    name='password'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
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
