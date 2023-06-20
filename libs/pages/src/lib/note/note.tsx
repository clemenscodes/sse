import { NoteForm, Redirect } from '@components';
import { cn } from '@styles';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type NoteProps = React.ComponentPropsWithoutRef<'div'>;

export const Note: NextPage<NoteProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
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
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Start creating notes :)</h1>
            <NoteForm />
        </div>
    );
};

export default Note;
