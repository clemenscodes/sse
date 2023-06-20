import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@styles';
import { CreatedNote } from '@types';
import { get, SearchSchema, searchSchema, useSearchStore } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
import { CommandDialog } from './../command/command';

export type SearchProps = React.ComponentPropsWithoutRef<'div'>;

export const Search: React.FC<SearchProps> = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const searchButtonRef = useRef<HTMLButtonElement>(null);

    const form = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: '',
        },
    });

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const onSubmit = async (values: SearchSchema) => {
        setOpen(false);
        const { search } = values;
        const encodedSearch = encodeURIComponent(search);
        const url = `/note/search?content=${encodedSearch}`;
        const { data, status } = await get<CreatedNote[]>(url);
        if (status !== 200) {
            toast({
                title: 'Failed searching for notes',
                variant: 'destructive',
            });
            return;
        }
        useSearchStore.setState((state) => {
            return {
                ...state,
                search,
                result: data,
            };
        });
        toast({ title: 'Successfully searched for notes' });
        router.push('/search');
    };

    return (
        <div {...props}>
            <Button
                variant='outline'
                className={cn(
                    'flex h-8 w-full justify-between space-x-4 p-4 py-5'
                )}
                onClick={() => setOpen(true)}
            >
                <span>Search</span>
                <kbd className='pointer-events-none hidden select-none rounded border px-2 md:flex'>
                    <span>⌘ K</span>
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                searchButtonRef.current?.click();
                            }
                        }}
                        className={cn('w-full space-y-2 rounded')}
                    >
                        <FormField
                            control={form.control}
                            name='search'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            placeholder='Search note by content...'
                                            {...field}
                                            className='w-full '
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            ref={searchButtonRef}
                            className={cn('hidden')}
                        >
                            Search
                        </Button>
                    </form>
                </Form>
            </CommandDialog>
        </div>
    );
};

export default Search;
