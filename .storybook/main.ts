import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    'storybook-addon-pseudo-states',
    '@storybook/addon-mdx-gfm',
  ],
  core: {
    disableTelemetry: true,
  },
  // async viteFinal(viteConfig, { configType }) {
  //   // console.dir(arguments);
  //   // process.exit(1);
  //   if (configType === 'PRODUCTION') {
  //     // Workaround for `storybook build` failure with this plugin is to remove it cause we don't need it in storybook.
  //     // `[vite-tiptop-rsi] The "path" argument must be of type string. Received undefined`
  //     const { default: vitePluginSriFactory } = await import('vite-tiptop-sri')
  //     // Removal works via the plugin name, but we can't use the package name because the plugin name mismatches the
  //     // package name: it is actually `"vite-tiptop-rsi"`. Yes, "sri" vs "rsi" and I found that out the hard way. 🤦
  //     const vitePluginSri = vitePluginSriFactory({ augmentManifest: true })
  //     viteConfig.plugins = (viteConfig.plugins ?? []).filter(
  //       (plugin) => plugin && 'name' in plugin && plugin.name !== vitePluginSri.name,
  //     )
  //   }
  //   return viteConfig
  // },
  docs: {
    autodocs: 'tag',
  },
}

export default config
