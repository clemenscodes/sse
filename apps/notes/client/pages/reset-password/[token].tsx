import { ResetPasswordProps } from '@components';
import { NotePageProps } from '@types';
import { getCookies, getNote } from '@utils';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(() =>
    import('@pages').then((mod) => mod.ResetPasswordPage)
);

export const getServerSideProps: GetServerSideProps<
    ResetPasswordProps
> = async ({ params }) => {
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

    const token = params.token as string;

    return {
        props: {
            token,
        },
    };
};

export default ResetPasswordPage;
