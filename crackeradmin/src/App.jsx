import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminOrdersManagement from './pages/AdminOrdersManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AdminOrdersManagement/>
      
    </div>
  )
}

export default App
