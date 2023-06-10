import { Footer, Header, Login, RegisterDialog } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

export type HomeProps = React.ComponentPropsWithoutRef<'div'>;

export const Home: NextPage<HomeProps> = ({ ...props }) => {
    const session = useSession();
    return (
        <div
            className={cn('flex h-screen flex-col justify-between')}
            {...props}
        >
            <Header />
            <main className={cn('mx-6 mb-auto mt-24 md:mx-12 xl:mx-24')}>
                {!session && (
                    <>
                        <Login />
                        <RegisterDialog />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
