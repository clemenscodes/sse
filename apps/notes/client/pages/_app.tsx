import { site } from '@config';
import { SessionProvider } from 'next-auth/react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';
import { Session } from 'next-auth';

const App: React.FC<AppProps<{ session: Session }>> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=0.8"
                />
                <title>{site.title}</title>
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
};

export default App;
