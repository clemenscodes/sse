import type { NotePageProps } from '@types';
import { getNote } from '@utils';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const Note = dynamic(() => import('@pages').then((mod) => mod.NotePage));

export const getServerSideProps: GetServerSideProps<NotePageProps> = async ({
    params,
    req,
}) => {
    if (!params) {
        throw new Error('No params');
    }
    const { cookies } = req;
    const sessionToken = cookies.sessionToken;
    const refreshToken = cookies.refreshToken;
    const parsedCookies = `sessionToken=${sessionToken}; refreshToken=${refreshToken}`;
    const noteId = params.id as string;
    const note = await getNote(noteId, parsedCookies);

    return {
        props: {
            note,
        },
    };
};

export default Note;
