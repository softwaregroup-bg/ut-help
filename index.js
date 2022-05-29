const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const {resolve, relative, dirname} = require('path');
const base = dirname(dirname(require.resolve('./package.json')));

/** @type {(options: {path: string, include: string[], url: string}) => import('@docusaurus/types').Config} */
module.exports = ({include, url = 'https://softwaregroup.com'}) => ({
    title: 'UT',
    tagline: 'Online help',
    url,
    baseUrl: '/a/help/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    staticDirectories: [resolve(__dirname, 'static')],
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },
    presets: [[
        require.resolve('@docusaurus/preset-classic'),
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
            docs: {
                path: base,
                include: include.map(name => relative(base, resolve(require.resolve(`${name}/package.json`), '../help/**/*.{md,mdx}'))),
                routeBasePath: '/',
                async sidebarItemsGenerator({
                    defaultSidebarItemsGenerator,
                    ...args
                }) {
                    const result = await defaultSidebarItemsGenerator(args);
                    return result.map(item => ('items' in item && item.items.length === 1) ? item.items[0] : item); // skip root folders
                }
            },
            theme: {},
            blog: false,
            pages: false,
            debug: false
        })
    ]],
    // plugins: [
    //     async function noProgress(context, options) {
    //         return {
    //             name: 'no-progress',
    //             configureWebpack(config, isServer, utils) {
    //                 config.plugins = config.plugins.filter(plugin => !['Client', 'Server'].includes(plugin?.options?.name));
    //             }
    //         };
    //     }
    // ],
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        navbar: {
            title: 'Help',
            logo: {
                alt: 'Logo',
                src: 'img/logo.png',
                href: '/a/help/'
            },
            items: []
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme
        }
    })
});
