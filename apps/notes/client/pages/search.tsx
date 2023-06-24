import type { SearchProps } from '@types';
import { getCookies, searchNotes } from '@utils';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@pages').then((mod) => mod.Search));

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({
    req,
    query,
}) => {
    const parsedCookies = getCookies(req);
    if (!parsedCookies) {
        const error = 'Unauthorized';
        const destination = `/error?message=${encodeURIComponent(error)}`;
        return {
            redirect: {
                destination,
            },
            props: {},
        };
    }
    const { content } = query;
    if (!content || content instanceof Array) {
        const error = 'Invalid search';
        const destination = `/error?message=${encodeURIComponent(error)}`;
        return {
            redirect: {
                destination,
            },
            props: {},
        };
    }
    const result = await searchNotes(content, parsedCookies);
    return {
        props: {
            search: content,
            result,
        },
    };
};

export default Search;
