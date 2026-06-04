import type { CartItem } from '../../entities/cart/types';
import { colors } from '../../shared/styles/theme';
import Button from '../../shared/ui/Button';
import Header from '../../shared/ui/Header';
import CartSection from './ui/CartSection';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const handleIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.min(99, item.quantity + 1) }
          : item,
      ),
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  useEffect(() => {
    async function fetchCart() {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/carts`);
      const data = await response.json();
      setCartItems(data);
    }
    fetchCart();
  }, []);

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
      <CartSection
        cartItems={cartItems}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
      <Button
        type={type}
        text="주문 확인"
        onClick={() => navigate('checkout')}
      />
    </div>
  );
}
