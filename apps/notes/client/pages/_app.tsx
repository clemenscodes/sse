import { site } from '@config';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';
import dynamic from 'next/dynamic';
import { Roboto_Condensed } from 'next/font/google';

const Layout = dynamic(() => import('@components').then((mod) => mod.Layout));
const Toaster = dynamic(() => import('@components').then((mod) => mod.Toaster));

const robotoCondensed = Roboto_Condensed({
    weight: '300',
    variable: '--font-sans',
    subsets: ['latin'],
    preload: false,
    display: 'swap',
});

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
            <div className={`${robotoCondensed.variable} font-sans`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
            <Toaster />
        </>
    );
};

export default App;
