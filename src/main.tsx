import createCache from '@emotion/cache'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App.tsx'
import './index.css'
import { configure as configureMobx } from 'mobx'
import { CacheProvider } from '@emotion/react'

configureMobx({
  enforceActions: 'always',
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
  safeDescriptors: true,
})

// Create an emotion cache in order to remove vendor prefixes.
const emotionCache = createCache({ key: 'ctrl', stylisPlugins: [] })

render(
  <StrictMode>
    <CacheProvider {...{ value: emotionCache }}>
      <App />
    </CacheProvider>
  </StrictMode>,
  document.getElementById('root') as HTMLElement,
)
