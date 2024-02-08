import { useState } from 'react'
import './App.css'
import './styles/globals.css'
import { observer } from 'mobx-react-lite'
import { Button } from './stories/Button'
import { PlateEditor } from './components/PlateEditor'

export const App = observer(function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </div>
      <PlateEditor />
    </>
  )
})
