import { Register } from '@components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

/* eslint-disable-next-line */
export interface SignupProps {}

export const Signup: NextPage<SignupProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return <Register />;
};

export default Signup;
