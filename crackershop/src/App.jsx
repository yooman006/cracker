import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrackerShop from './pages/CrackerShop';
import CrackerShopCheckout from './pages/CrackerShopCheckout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<CrackerShop />} />
        <Route path="/checkout" element={<CrackerShopCheckout />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;