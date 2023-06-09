import { Button } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

/* eslint-disable-next-line */
export interface SignoutProps {}

export const Signout: NextPage<SignoutProps> = ({ ...props }) => {
    const { data } = useSession();
    if (!data) return;
    return (
        <Button onClick={() => signOut()} className={cn()} {...props}>
            Sign out
        </Button>
    );
};

export default Signout;
