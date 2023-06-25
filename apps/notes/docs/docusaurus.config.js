// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Notes',
    url: 'https://clemenscodes.github.io',
    baseUrl: '/sse/',
    trailingSlash: false,
    organizationName: 'clemenscodes',
    projectName: 'sse',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    noIndex: true,
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'en'],
    },
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
                    breadcrumbs: true,
                    editUrl:
                        'https://github.com/clemenscodes/sse/edit/main/apps/notes/docs',
                },
                pages: false,
                blog: false,
                sitemap: false,
                theme: {
                    customCss: require.resolve('./custom.css'),
                },
            }),
        ],
    ],
    plugins: [
        async function loadTailwind(context, options) {
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
