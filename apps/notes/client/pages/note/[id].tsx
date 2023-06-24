import type { NotePageProps } from '@types';
import { getCookies, getNote } from '@utils';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const Note = dynamic(() => import('@pages').then((mod) => mod.NotePage));

export const getServerSideProps: GetServerSideProps<NotePageProps> = async ({
    params,
    req,
}) => {
    if (!params) {
        const error = 'No parameter';
        const destination = `/error?message=${encodeURIComponent(error)}`;
        return {
            redirect: {
                destination,
            },
            props: {},
        };
    }
    const parsedCookies = getCookies(req);
    const noteId = params.id as string;
    const note = await getNote(noteId, parsedCookies);
    return {
        props: {
            note,
        },
    };
};

export default Note;
