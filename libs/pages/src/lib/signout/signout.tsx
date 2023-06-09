import { Button } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Error from '../error/error';

/* eslint-disable-next-line */
export interface SignoutProps {}

export const Signout: NextPage<SignoutProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return <Error error={'Shouldnt be possible to visit'} />;
    return (
        <Button onClick={() => signOut()} className={cn()} {...props}>
            Sign out
        </Button>
    );
};

export default Signout;
