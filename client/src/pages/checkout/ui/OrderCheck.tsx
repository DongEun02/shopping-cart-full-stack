import { useLocation } from 'react-router-dom';
import type { CartItem } from '../../../entities/cart/types';
import Flex from '../../../shared/layout/Flex';
import Txt from '../../../shared/ui/Txt';

type CheckoutState = {
  cartItems: CartItem[];
  totalAmount: number;
};

export default function OrderCheck() {
  const location = useLocation();
  const state = location.state as CheckoutState | null;

  const cartItems = state?.cartItems ?? [];
  const itemCount = cartItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
  const totalAmount = state?.totalAmount ?? 0;

  return (
    <Flex
      as="section"
      direction="column"
      gap={24}
      align="center"
      justify="center"
      styles={{
        height: '90vh',
      }}
    >
      <Txt variant="title" color="text">
        주문 확인
      </Txt>
      <Txt variant="label" color="text" styles={{ textAlign: 'center' }}>
        총 {cartItems.length}종류의 상품 {itemCount}개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </Txt>
      <Flex direction="column" gap={12} align="center">
        <Txt variant="button" color="text">
          총 결제 금액
        </Txt>
        <Txt variant="title" color="text">
          {totalAmount.toLocaleString()}원
        </Txt>
      </Flex>
    </Flex>
  );
}
