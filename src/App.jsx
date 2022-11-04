import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clock from './components/Clock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Clock />
    </div>
  )
}

export default App
