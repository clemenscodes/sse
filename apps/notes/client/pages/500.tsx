import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@pages').then((mod) => mod.Error));

export const ServerError: NextPage = () => {
    return <Error error={'500'} />;
};

export default ServerError;
