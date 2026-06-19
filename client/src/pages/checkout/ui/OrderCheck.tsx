import { useLocation } from 'react-router-dom';
import type { CartItem } from '../../../entities/cart/types';
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
    <section
      css={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Txt variant="title" color="text">
        주문 확인
      </Txt>
      <Txt variant="label" color="text" styles={{ textAlign: 'center' }}>
        총 {cartItems.length}종류의 상품 {itemCount}개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </Txt>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <Txt variant="button" color="text">
          총 결제 금액
        </Txt>
        <Txt variant="title" color="text">
          {totalAmount.toLocaleString()}원
        </Txt>
      </div>
    </section>
  );
}
