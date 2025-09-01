// App.jsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminOrdersManagement from './pages/AdminOrdersManagement'
import OrderDetails from './pages/OrderDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Routes> 
        <Route path="/" element={<AdminOrdersManagement/>} />
        <Route path="/order/:orderId" element={<OrderDetails/>} />
      </Routes>
    </Router>
  )
}

export default App