import path from 'path';
// import { authWrapperSSR, options } from '@auth';
import { options } from '@auth';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';

// import next config in any page file to somehow make next aware of correct folder structure (MAGIC)
// somehow required for standalone output to work in a monorepo
// see https://github.com/nrwl/nx/issues/9017#issuecomment-1284740346
path.resolve('./next.config.js');

const Home = dynamic(() => import('@pages').then((mod) => mod.Home));

export const Index: NextPage = () => {
    return <Home />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    console.log('Getting server session');
    // const { req, res, query } = context;
    // const [options] = authWrapperSSR(req, query, res);
    const { req, res } = context;
    const session = await getServerSession(req, res, options);

    return {
        props: {
            session,
        },
    };
}

export default Index;
