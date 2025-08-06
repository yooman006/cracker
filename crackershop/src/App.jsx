import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrackerShop from './pages/CrackerShop';
import CrackerShopCheckout from './pages/CrackerShopCheckout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrackerShop />} />
        <Route path="/checkout" element={<CrackerShopCheckout />} />
      </Routes>
    </Router>
  );
}

export default App;