import createCache from '@emotion/cache'
import { StrictMode } from 'react'
// import { render } from 'react-dom'
import { createRoot } from 'react-dom/client'
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

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  // render(
  <StrictMode>
    <CacheProvider {...{ value: emotionCache }}>
      <App />
    </CacheProvider>
  </StrictMode>, //,
  //   document.getElementById('root') as HTMLElement,
)
