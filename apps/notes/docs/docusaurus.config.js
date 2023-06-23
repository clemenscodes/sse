// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Notes',
    url: 'https://clemenscodes.github.io',
    baseUrl: '/',
    trailingSlash: false,
    organizationName: 'clemenscodes',
    projectName: 'sse',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Notes',
                items: [
                    {
                        href: 'https://github.com/clemenscodes/sse',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} Notes. SSE., Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: require('prism-react-renderer/themes/github'),
                darkTheme: require('prism-react-renderer/themes/dracula'),
            },
        }),
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    path: 'src',
                    routeBasePath: '/',
                    sidebarCollapsible: true,
                },
                theme: {
                    customCss: require.resolve('./custom.css'),
                },
            }),
        ],
    ],
    plugins: [
        async function myPlugin(context, options) {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    postcssOptions.plugins.push(require('tailwindcss'));
                    postcssOptions.plugins.push(require('autoprefixer'));
                    return postcssOptions;
                },
            };
        },
    ],
};

module.exports = config;
