import type { CartItem } from '../../entities/cart/types';
import { colors } from '../../shared/styles/theme';
import Button from '../../shared/ui/Button';
import Header from '../../shared/ui/Header';
import CartSection from './ui/CartSection';
import {
  deleteCartItem,
  updateCartItemQuantity,
  fetchCartItems,
} from '../../entities/cart/api/cartApi';
import {
  calculateOrderAmount,
  calculateDeliveryFee,
  calculateTotalAmount,
} from '../../entities/cart/calculate';
import {
  getSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../../entities/cart/storage';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const selectedItems = cartItems.filter((item) => item.isSelected);
  const orderAmount = calculateOrderAmount(selectedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = calculateTotalAmount(orderAmount, deliveryFee);

  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => item.isSelected);

  const handleToggleItem = (id: string, checked: boolean) => {
    setCartItems((prev) => {
      const nextCartItems = prev.map((item) =>
        item.product.id === id ? { ...item, isSelected: checked } : item,
      );

      saveSelectedCartItemIds(nextCartItems);

      return nextCartItems;
    });
  };

  const handleToggleAll = (checked: boolean) => {
    setCartItems((prev) => {
      const nextCartItems = prev.map((item) => ({
        ...item,
        isSelected: checked,
      }));

      saveSelectedCartItemIds(nextCartItems);

      return nextCartItems;
    });
  };

  const handleDelete = async (id: string) => {
    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    try {
      await deleteCartItem(id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    setCartItems((prev) => {
      const nextCartItems = prev.filter((item) => item.product.id !== id);

      saveSelectedCartItemIds(nextCartItems);

      return nextCartItems;
    });
  };

  const handleIncrease = async (id: string) => {
    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const nextQuantity = Math.min(99, currentItem.quantity + 1);

    try {
      await updateCartItemQuantity(id, nextQuantity);

      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, quantity: nextQuantity } : item,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleDecrease = async (id: string) => {
    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const nextQuantity = Math.max(1, currentItem.quantity - 1);

    try {
      await updateCartItemQuantity(id, nextQuantity);

      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, quantity: nextQuantity } : item,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await fetchCartItems();
        const selectedCartItemIds = getSelectedCartItemIds();

        setCartItems(
          data.map((item) => ({
            ...item,
            isSelected: selectedCartItemIds
              ? selectedCartItemIds.includes(item.product.id)
              : true,
          })),
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
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
        isAllSelected={isAllSelected}
        handleToggleItem={handleToggleItem}
        handleToggleAll={handleToggleAll}
        orderAmount={orderAmount}
        deliveryFee={deliveryFee}
        totalAmount={totalAmount}
      />
      <Button
        type={type}
        text="주문 확인"
        onClick={() =>
          navigate('checkout', {
            state: {
              cartItems: selectedItems,
              totalAmount,
            },
          })
        }
      />
    </div>
  );
}
