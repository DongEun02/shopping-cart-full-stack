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

  const handleDelete = async (id: string) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'DELETE',
    });

    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleIncrease = async (id: string) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const nextQuantity = Math.min(99, currentItem.quantity + 1);

    await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: nextQuantity,
      }),
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const handleDecrease = async (id: string) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const nextQuantity = Math.max(1, currentItem.quantity - 1);

    await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: nextQuantity,
      }),
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: nextQuantity } : item,
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
        handleDelete={handleDelete}
      />
      <Button
        type={type}
        text="주문 확인"
        onClick={() => navigate('checkout')}
      />
    </div>
  );
}
