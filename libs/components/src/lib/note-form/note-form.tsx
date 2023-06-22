import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { IconFilePlus } from '@tabler/icons-react';
import type { CreatedNote } from '@types';
import { NoteSchema, noteSchema, post, usePreviewStore } from '@utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
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
import Textarea from '../textarea/textarea';
import { toast } from '../toast/useToast';

export type NoteFormProps = React.ComponentPropsWithoutRef<'form'> & {
    submit?: (values: NoteSchema) => Promise<void>;
};

export const NoteForm: React.FC<NoteFormProps> = ({
    submit,
    className,
    ...props
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<NoteSchema>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            content: '',
            isPublic: false,
            attachment: '',
        },
    });

    const onChange = () => {
        const { content, attachment } = form.getValues();
        if (!attachment) {
            form.resetField('attachment');
        }
        usePreviewStore.setState((state) => {
            return {
                ...state,
                preview: content,
                attachment: attachment ? attachment : '',
            };
        });
    };

    const onSubmit = async (values: NoteSchema) => {
        if (submit) {
            return submit(values);
        }
        setIsSubmitting(true);
        const { data, status } = await post<NoteSchema, CreatedNote>(
            '/note',
            values
        );
        if (!data || status !== 201) {
            toast({
                title: 'Failed creating note',
                variant: 'destructive',
            });
            return null;
        }
        form.reset();
        const noteUrl = `/note/${data.id}`;
        router.push(noteUrl);
        toast({ title: 'Successfully created note' });
        setTimeout(() => setIsSubmitting(false), 5000);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={onChange}
                className={cn(
                    'mx-auto w-full space-y-2 rounded bg-white px-8 pb-8 pt-6',
                    'sm:max-w-scree-sm',
                    'md:max-w-screen-md',
                    'lg:max-w-full',
                    className || ''
                )}
                {...props}
            >
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Textarea
                                    placeholder='# My amazing note'
                                    className='h-[28rem] resize-y'
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='isPublic'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-start space-x-3 space-y-0 rounded-md border p-4'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value || false}
                                    onCheckedChange={field.onChange}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>Public note</FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='attachment'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col items-start rounded-md border p-4'>
                            <FormControl>
                                <Input
                                    placeholder='YouTube URL or video ID'
                                    className='w-full border-2 border-gray-300'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can attach a YouTube video to the note
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={cn('flex flex-col items-center')}>
                    <Button
                        type='submit'
                        className={cn('h-full w-full')}
                        disabled={isSubmitting}
                    >
                        <IconFilePlus />
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NoteForm;
