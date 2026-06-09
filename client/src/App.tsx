import { Global } from '@emotion/react';
import { globalStyles } from './shared/styles/global';
import { Routes, Route } from 'react-router-dom';

import CartRoute from './pages/cart/CartRoute';
import CheckoutPage from './pages/checkout/CheckoutPage';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<CartRoute />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
