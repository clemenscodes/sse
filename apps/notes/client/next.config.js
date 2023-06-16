//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: true,
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/auth/register',
                destination: 'http://server:3000/api/auth/register',
            },
            {
                source: '/api/auth/login',
                destination: 'http://server:3000/api/auth/login',
            },
            {
                source: '/api/auth/logout',
                destination: 'http://server:3000/api/auth/logout',
            },
            {
                source: '/api/auth/session/:path*',
                destination: 'http://server:3000/api/auth/session/:path*',
            },
            {
                source: '/api/auth/session',
                destination: 'http://server:3000/api/auth/session',
            },
            {
                source: '/api/auth/',
                destination: '/api/auth/',
            },
            {
                source: '/api/auth/:path*',
                destination: '/api/auth/:path*',
            },
            {
                source: '/api/:path*',
                destination: 'http://server:3000/api/:path*',
            },
        ];
    },
    poweredByHeader: false,
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
