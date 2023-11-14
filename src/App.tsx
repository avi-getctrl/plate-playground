import { useState } from 'react'
import './App.css'
import { observer } from 'mobx-react-lite'
import { Button } from './stories/Button'
import { Plate, Value, createPlugins } from '@udecode/plate-common'
import { Editor } from '../@/components/plate-ui/editor'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createBoldPlugin, createItalicPlugin, createUnderlinePlugin } from '@udecode/plate-basic-marks'
import { createPlateUI } from '../@/plate/create-plate-ui'

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createHeadingPlugin(),

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

export const App = observer(function App() {
  const [count, setCount] = useState(0)
  const [debugValue, setDebugValue] = useState<Value>(initialValue)

  return (
    <>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </div>
      <Plate
        {...{
          plugins,
          initialValue,
          onChange: setDebugValue,
        }}
      >
        <Editor {...{ placeholder: 'Type...' }} />
      </Plate>
      <h5>Debug Value</h5>
      <code>{JSON.stringify(debugValue)}</code>
    </>
  )
})
