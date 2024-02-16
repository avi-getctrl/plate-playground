import { useState } from 'react'
import './App.css'
import './styles/globals.css'
import { observer } from 'mobx-react-lite'
import { Button } from './stories/Button'
import { PlateEditor, getInitialEmptyEditorValue } from './components/PlateEditor'

export const App = observer(function App() {
  const [count, setCount] = useState(0)

  return (
    <main {...{ style: { display: 'flex', flexDirection: 'column', gap: '1em' } }}>
      <Button {...{ onClick: () => setCount(() => count + 1), children: `Count is ${count}` }} />
      <PlateEditor />
      <PlateEditor {...{ initialValue: [{ type: 'p', children: [{ text: 'Not empty' }] }] }} />
      <PlateEditor {...{ initialValue: getInitialEmptyEditorValue() }} />
    </main>
  )
})
