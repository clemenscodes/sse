import path from 'path';
import { authWrapper } from '@auth';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession, Session } from 'next-auth';
import dynamic from 'next/dynamic';

// import next config in any page file to somehow make next aware of correct folder structure (MAGIC)
// somehow required for standalone output to work in a monorepo
// see https://github.com/nrwl/nx/issues/9017#issuecomment-1284740346
path.resolve('./next.config.js');

const Home = dynamic(() => import('@pages').then((mod) => mod.Home));

export const Index: NextPage = () => {
    return <Home />;
};

export const getServerSideProps: GetServerSideProps<{
    session: Session;
}> = async (context: GetServerSidePropsContext) => {
    const { req, res, query } = context;
    const [options] = authWrapper(req, query, res);

    const session: Session = {
        user: {},
        expires: new Date().toISOString(),
    };

    const response = await getServerSession(req, res, options);

    if (response) {
        session.expires = response.expires;
        session.user.email = response.user.email;
    }

    return {
        props: {
            session,
        },
    };
};

export default Index;
