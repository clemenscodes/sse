import { Button } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';

/* eslint-disable-next-line */
export interface SignoutProps {}

export const Signout: NextPage<SignoutProps> = ({ ...props }) => {
    return (
        <Button className={cn()} {...props}>
            Sign out
        </Button>
    );
};

export default Signout;
