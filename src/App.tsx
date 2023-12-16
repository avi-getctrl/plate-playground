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
import { /* ELEMENT_LI, */ createListPlugin } from '@udecode/plate-list'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { createTabbablePlugin } from '@udecode/plate-tabbable'
import { createComboboxPlugin } from '@udecode/plate-combobox'
import { createMentionPlugin } from '@udecode/plate-mention'
import { MentionCombobox } from '../@/components/plate-ui/mention-combobox'
import { MENTIONABLES } from './mentionables'

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
    createListPlugin(),
    createIndentPlugin({
      // inject: {
      //   props: {
      //     validTypes: [ELEMENT_LI],
      //   },
      // },
    }),
    createIndentListPlugin({
      // inject: {
      //   props: {
      //     validTypes: [ELEMENT_LI],
      //   },
      // },
    }),
    createTabbablePlugin({
      // options: {
      //   query(editor): boolean {
      //     const inList = findNode(editor, { match: { type: ELEMENT_LI } })
      //     // const inCodeBlock = findNode(editor, { match: { type: ELEMENT_CODE_BLOCK } })
      //     return !inList // && !inCodeBlock
      //   },
      // },
    }),
    createComboboxPlugin(),
    createMentionPlugin({
      options: {
        triggerPreviousCharPattern: /^$|^[\s"']$/,
      },
    }),
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
    children: [{ text: 'This is editable plain text with react and history plugins, just like a <textarea>!' }],
    listStyleType: 'disc',
    indent: 1,
  },
  { type: 'p', listStyleType: 'disc', indent: 1, children: [{ text: 'Second row' }], listStart: 2 },
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
          <MentionCombobox items={MENTIONABLES} />
        </TooltipProvider>
      </Plate>
      <h5>Debug Value</h5>
      <code>{JSON.stringify(debugValue)}</code>
    </>
  )
})
