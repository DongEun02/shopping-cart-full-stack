import { colors, typography } from '../../shared/styles/theme';
import Button from '../../shared/ui/Button';
import Header from '../../shared/ui/Header';
import Spinner from '../../shared/ui/Spinner';
import CartSection from './ui/CartSection';
import {
  deleteCartItem,
  updateCartItemQuantity,
  fetchCartItems,
} from '../../entities/cart/api/cartApi';
import {
  getSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../../entities/cart/storage';
import {
  calculateDeliveryFee,
  calculateOrderAmount,
  calculateTotalAmount,
} from '../../entities/cart/calculate';
import { useCart } from './hooks/useCart';

import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    isLoading,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
    changeCartItemSelection,
    changeAllCartItemsSelection,
  } = useCart({
    fetchItems: fetchCartItems,
    updateItemQuantity: updateCartItemQuantity,
    removeItem: deleteCartItem,
    loadSelectedItemIds: getSelectedCartItemIds,
    saveSelectedItems: saveSelectedCartItemIds,
  });

  const selectedItems = cartItems.filter((item) => item.isSelected);
  const orderAmount = calculateOrderAmount(selectedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = calculateTotalAmount(orderAmount, deliveryFee);
  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => item.isSelected);

  const type = selectedItems.length === 0 ? 'inactive' : 'active';

  if (isLoading) {
    return (
      <div
        css={{
          backgroundColor: colors.white,
          width: '430px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        css={{
          backgroundColor: colors.white,
          width: '430px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <p
          css={{
            ...typography.label,
            color: 'red',
          }}
        >
          {error.message}
        </p>
      </div>
    );
  }

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
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onDelete={removeCartItem}
        isAllSelected={isAllSelected}
        onToggleItem={changeCartItemSelection}
        onToggleAll={changeAllCartItemsSelection}
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
