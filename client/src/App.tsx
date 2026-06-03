import { Global } from '@emotion/react';
import { globalStyles } from './shared/styles/global';
import { Routes, Route } from 'react-router-dom';

import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
