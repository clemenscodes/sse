import { Footer, Header, Login, RegisterDialog } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import Signup from '../signup/signup';
import { SessionProvider } from 'next-auth/react';
import Signin from '../signin/signin';

export type HomeProps = React.ComponentPropsWithoutRef<'div'>;

export const Home: NextPage<HomeProps> = ({ ...props }) => {
    return (
        <SessionProvider>
            <div
                className={cn('flex h-screen flex-col justify-between')}
                {...props}
            >
                <Header />
                <main className={cn('mx-6 mb-auto mt-24 md:mx-12 xl:mx-24')}>
                    <Signin></Signin>
                    <Signup></Signup>
                </main>
                <Footer />
            </div>
        </SessionProvider>
    );
};

export default Home;
