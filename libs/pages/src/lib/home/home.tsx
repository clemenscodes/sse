import { Footer, Header } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import Signin from '../signin/signin';
import Signup from '../signup/signup';

export type HomeProps = React.ComponentPropsWithoutRef<'div'>;

export const Home: NextPage<HomeProps> = ({ ...props }) => {
    return (
        <div
            className={cn('flex h-screen flex-col justify-between')}
            {...props}
        >
            <Header />
            <main className={cn('mx-6 mb-auto mt-24 md:mx-12 xl:mx-24')}>
                <div className={cn('flex justify-center')}>
                    <Signin />
                    <Signup />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
