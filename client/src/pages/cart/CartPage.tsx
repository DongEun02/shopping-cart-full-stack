import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  calculateDeliveryFee,
  calculateOrderAmount,
  calculateTotalAmount,
} from '../../entities/cart/calculate';
import { getSelectedCartItems } from '../../entities/cart/selector';
import { colors } from '../../shared/styles/theme';
import Flex from '../../shared/layout/Flex';
import { BottomButton } from '../../shared/ui/Button';
import Header from '../../shared/ui/Header';
import Spinner from '../../shared/ui/Spinner';
import Txt from '../../shared/ui/Txt';
import { useCartItems } from './hooks/useCartItems';
import { useCartMutationError } from './hooks/useCartMutationError';
import CartList from './ui/CartList';
import CartSection from './ui/CartSection';
import OrderSummary from './ui/OrderSummary';

export default function CartPage() {
  const navigate = useNavigate();

  const { cartItems, isLoading, error } = useCartItems();
  const mutationError = useCartMutationError();

  const selectedItems = getSelectedCartItems(cartItems);
  const orderAmount = calculateOrderAmount(selectedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = calculateTotalAmount(orderAmount, deliveryFee);

  useEffect(() => {
    if (!mutationError) return;

    alert(mutationError.message);
  }, [mutationError]);

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        styles={{
          backgroundColor: colors.white,
          width: '430px',
          minHeight: '100vh',
          margin: '0 auto',
        }}
      >
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        align="center"
        justify="center"
        styles={{
          backgroundColor: colors.white,
          width: '430px',
          minHeight: '100vh',
          margin: '0 auto',
        }}
      >
        <Txt variant="label" color="error">
          {error.message}
        </Txt>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap={36}
      align="center"
      styles={{
        backgroundColor: colors.white,
        width: '430px',
        minHeight: '100vh',
        margin: '0 auto',
      }}
    >
      <Header>
        <Txt variant="header" color="white">
          SHOP
        </Txt>
      </Header>
      <CartSection cartItemsCount={cartItems.length}>
        <CartList cartItems={cartItems} />
        <OrderSummary
          orderAmount={orderAmount}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
        />
      </CartSection>
      <BottomButton
        disabled={selectedItems.length === 0}
        onClick={() =>
          navigate('checkout', {
            state: {
              cartItems: selectedItems,
              totalAmount,
            },
          })
        }
      >
        주문 확인
      </BottomButton>
    </Flex>
  );
}
