import { Button } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import Link from 'next/link';

export type HomeProps = React.ComponentPropsWithoutRef<'div'>;

export const Home: NextPage<HomeProps> = ({ ...props }) => {
    return (
        <div
            className={cn('flex flex-col items-center justify-center')}
            {...props}
        >
            <h1 className={cn('text-4xl font-bold mb-4')}>
                Welcome to Secure Notes!
            </h1>
            <p className="text-lg text-gray-500 mb-8">
                Start organizing your notes today!
            </p>
            <div className="space-x-16">
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
                <Link href="/register">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
