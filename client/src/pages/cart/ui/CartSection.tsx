import type { CartItem } from '../../../entities/cart/types';
import { colors, typography } from '../../../shared/styles/theme';
import CartList from './CartList';
import OrderSummary from './OrderSummary';

type CartSectionProps = {
  cartItems: CartItem[];
  handleIncrease: (id: string) => Promise<void>;
  handleDecrease: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  isAllSelected: boolean;
  handleToggleItem: (id: string, checked: boolean) => void;
  handleToggleAll: (checked: boolean) => void;
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
};

export default function CartSection({
  cartItems,
  handleIncrease,
  handleDecrease,
  handleDelete,
  isAllSelected,
  handleToggleItem,
  handleToggleAll,
  orderAmount,
  deliveryFee,
  totalAmount,
}: CartSectionProps) {
  // 상품이 없는 경우
  if (cartItems.length === 0) {
    return (
      <p
        css={{
          color: colors.text,
          ...typography.info,
          textAlign: 'center',
          margin: 'auto 0',
        }}
      >
        장바구니에 담은 상품이 없습니다.
      </p>
    );
  }

  return (
    <section
      css={{
        height: '75vh',
        overflowY: 'scroll',
        width: '100%',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      <div>
        <h1
          css={{
            color: colors.black,
            ...typography.title,
            marginBottom: '12px',
          }}
        >
          장바구니
        </h1>
        <p
          css={{
            color: colors.text,
            ...typography.label,
          }}
        >
          현재 {cartItems.length}종류의 상품이 담겨있습니다.
        </p>
      </div>
      <CartList
        cartItems={cartItems}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleDelete={handleDelete}
        isAllSelected={isAllSelected}
        handleToggleItem={handleToggleItem}
        handleToggleAll={handleToggleAll}
      />
      <OrderSummary
        orderAmount={orderAmount}
        deliveryFee={deliveryFee}
        totalAmount={totalAmount}
      />
    </section>
  );
}
