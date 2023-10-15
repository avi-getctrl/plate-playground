/// <reference types="vitest/config" />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(async function getViteConfig({ command: _command, mode: _mode, ssrBuild: _ssrBuild }) {
  // const { default: vitePluginSri } = await import('vite-tiptop-sri')
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: [['@emotion/babel-plugin', { sourceMap: true, autoLabel: 'always' }]],
        },
      }),
      vitePluginSvgr(),
      splitVendorChunkPlugin(),
      // Although not documented, this plugin also minifies the HTML and inlines CSS.
      // vitePluginSri({ augmentManifest: true }),
    ],
    css: {
      devSourcemap: true,
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      manifest: true,
    },
    test: {
      globals: false,
      useAtomics: true,
      environment: 'jsdom',
      reporters: ['basic'],
      setupFiles: ['./src/setupTests.ts'],
      coverage: {
        reporter: ['text', 'html'],
        exclude: ['node_modules/', 'src/setupTests.ts', 'src/__generated__/', './storybook'],
      },
    },
  }
})
