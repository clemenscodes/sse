import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@pages').then((mod) => mod.Error));

export const NotFound: NextPage = () => {
    return <Error error={'404'} />;
};

export default NotFound;
