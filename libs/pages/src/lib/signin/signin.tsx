import { Login } from '@components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Error } from '../error/error';

/* eslint-disable-next-line */
export interface SigninProps {}

export const Signin: NextPage<SigninProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return <Login />;
    return <Error error={'shouldnt be possible to visit'} />;
};

export default Signin;
