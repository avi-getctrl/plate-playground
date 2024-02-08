import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import styled from '@emotion/styled'
import type { Preview, StoryContext } from '@storybook/react'
import { theme } from './manager'
import { type ComponentProps, type ElementType, StrictMode, type FC } from 'react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: /(.*Component|^as|^theme)$/,
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      theme,
      // https://storybook.js.org/docs/react/writing-docs/doc-blocks#docspage-1
      source: { type: 'auto', state: 'open' },
    },
    layout: 'centered',
    darkMode: { stylePreview: true },
    // https://www.chromatic.com/docs/animations
    chromatic: { pauseAnimationAtEnd: true },
  },
}

export default preview

const PreviewMain = styled.main`
  resize: both;
  overflow: auto;
  outline: medium dashed red;
`

// Create an emotion cache in order to remove vendor prefixes.
const emotionCache = createCache({
  key: 'ctrl-sb',
  stylisPlugins: [],
})

export interface PreviewMainProps extends ComponentProps<typeof PreviewMain> {
  readonly as?: ElementType
}

export const decorators = [
  function DecorateWithGlobalCss(Story: FC<StoryContext>, options: StoryContext) {
    // Based on https://dev.to/tmikeschu/controlling-global-decorators-via-args-in-storybook-41lf
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const wrapperArgs = options.parameters['wrapperArgs'] ?? {}
    return (
      <StrictMode>
        <CacheProvider {...{ value: emotionCache }}>
          {/* <GlobalCss /> */}
          <PreviewMain
            {...{
              id: 'preview-root',
              title: 'Resize the component container using the bottom right corner ⇲',
              ...wrapperArgs,
              children: <Story {...options} />,
            }}
          />
        </CacheProvider>
      </StrictMode>
    )
  },
] as const
