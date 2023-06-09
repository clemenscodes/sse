import { Login } from '@components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

/* eslint-disable-next-line */
export interface SigninProps {}

export const Signin: NextPage<SigninProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return <Login />;
};

export default Signin;
