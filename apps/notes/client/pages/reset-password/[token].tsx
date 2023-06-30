import type { ResetPasswordPageProps } from '@types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(() =>
    import('@pages').then((mod) => mod.ResetPasswordPage)
);

export const getServerSideProps: GetServerSideProps<
    ResetPasswordPageProps
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
