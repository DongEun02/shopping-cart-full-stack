import type { CartItem } from '../../entities/cart/types';
import { colors } from '../../shared/styles/theme';
import Button from '../../shared/ui/Button';
import Header from '../../shared/ui/Header';
import CartSection from './ui/CartSection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const type = cartItems.length === 0 ? 'inactive' : 'active';

  return (
    <div
      css={{
        backgroundColor: colors.white,
        width: '430px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        gap: '36px',
      }}
    >
      <Header page="cart" />
      <CartSection cartItems={cartItems} />
      <Button
        type={type}
        text="주문 확인"
        onClick={() => navigate('checkout')}
      />
    </div>
  );
}
