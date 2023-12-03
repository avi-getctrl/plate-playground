import { useState } from 'react'
import './App.css'
import './styles/globals.css'
import { observer } from 'mobx-react-lite'
import { Button } from './stories/Button'
import { Plate, RenderAfterEditable, Value, createPlugins } from '@udecode/plate-common'
import { Editor } from '../@/components/plate-ui/editor'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
// import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createBoldPlugin, createItalicPlugin, createUnderlinePlugin } from '@udecode/plate-basic-marks'
import { createPlateUI } from '../@/plate/create-plate-ui'
import { EditableProps } from 'slate-react/dist/components/editable'
import { FloatingToolbar } from '../@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../@/components/plate-ui/floating-toolbar-buttons'
import { TooltipProvider } from '../@/components/plate-ui/tooltip'
import { createLinkPlugin } from '@udecode/plate-link'
import { LinkFloatingToolbar } from '../@/components/plate-ui/link-floating-toolbar'

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    // createBlockquotePlugin(),
    createHeadingPlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
  ],
  {
    // Pick your components in https://platejs.org/?builder=true
    components: createPlateUI(),
  },
)

// Cannot be immutable :(
const initialValue = [
  {
    type: 'p',
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
  },
]

const editableProps: EditableProps = {
  placeholder: 'Type...',
} as const

export const App = observer(function App() {
  const [count, setCount] = useState(0)
  const [debugValue, setDebugValue] = useState<Value>(initialValue)

  return (
    <>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </div>
      <Plate {...{ plugins, initialValue, onChange: setDebugValue }}>
        <TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
          <Editor {...editableProps} />
          <FloatingToolbar {...{}}>
            {/* apps/www/src/components/context/providers.tsx */}
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </TooltipProvider>
      </Plate>
      <h5>Debug Value</h5>
      <code>{JSON.stringify(debugValue)}</code>
    </>
  )
})
