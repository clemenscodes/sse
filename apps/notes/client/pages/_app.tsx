import { site } from '@config';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=0.8"
                />
                <title>{site.title}</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;
