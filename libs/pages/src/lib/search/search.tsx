import { NoteList, Redirect } from '@components';
import { cn } from '@styles';
import { useSearchStore, useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type SearchProps = React.ComponentPropsWithoutRef<'div'>;

export const Search: NextPage<SearchProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
    const search = useSearchStore((state) => state.search);
    const result = useSearchStore((state) => state.result);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (!session) {
        return <Redirect href={'/login'} />;
    }

    return (
        <div
            className={cn('flex flex-col mb-12 items-center justify-center')}
            {...props}
        >
            <h1 className={cn('text-xl break-all')}>
                Search results for: {search}
            </h1>
            {result?.length ? (
                <NoteList notes={result} />
            ) : (
                <p className={cn()}>No notes found</p>
            )}
        </div>
    );
};

export default Search;
