import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { Auth } from '@types';
import { post, RegisterSchema } from '@utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
    forgotPasswordSchema,
    type ForgotPasswordSchema,
} from '../../../../utils/src/lib/models/forgotPasswordSchema';
import { Button } from '../button/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../form/form';
import { Input } from '../input/input';

export type ForgotPasswordProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: ForgotPasswordSchema) => Promise<void>;
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
    submit,
    ...props
}) => {
    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const router = useRouter();

    const onSubmit = async (values: ForgotPasswordSchema) => {
        if (submit) {
            return submit(values);
        }
        await post('/auth/send-email', values);
        await router.push('/email-sent');
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
                    name='email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    placeholder='Email'
                                    {...field}
                                    className='w-full border-2 border-gray-300'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-full'>
                    Send Reset Code
                </Button>
            </form>
        </Form>
    );
};

export default ForgotPassword;
