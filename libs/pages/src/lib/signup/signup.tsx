import { Register } from '@components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Error } from '../error/error';

/* eslint-disable-next-line */
export interface SignupProps {}

export const Signup: NextPage<SignupProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return <Register />;
    return <Error error={'shouldnt be possible to visit'} />;
};

export default Signup;