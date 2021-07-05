/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require('path')

module.exports = {
  title: 'S-Money',
  tagline: 'Baseline',
  url: 'https://docusaurus-lansolo99-test.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  noIndex: true,
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      // title: 'API doc',
      logo: {
        alt: 'S-Money API',
        src: 'img/logo_s-money.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'docs/getting-started',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'api/introduction',
          label: 'API reference',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  plugins: [
    path.resolve(__dirname, './plugins/customDocument'),
    path.resolve(__dirname, './plugins/docusaurus-tailwindcss-loader'),
    [require.resolve('@cmfcmf/docusaurus-search-local'), {}],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/lansolo99/s-money/edit/main/',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
