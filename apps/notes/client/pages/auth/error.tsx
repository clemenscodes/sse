import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@pages').then((mod) => mod.Error));

export const AuthError: NextPage = () => {
    return <Error error={'Authorization failed'} />;
};

export default AuthError;
