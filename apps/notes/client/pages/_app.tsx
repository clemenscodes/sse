import { site } from '@config';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@components').then((mod) => mod.Layout));

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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default App;
