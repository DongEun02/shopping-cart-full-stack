import type { CartItem } from '../../../entities/cart/types';
import CartItemCard from '../../../entities/cart/ui/CartItemCard';
import Checkbox from '../../../shared/ui/CheckBox';

type CartListProps = {
  cartItems: CartItem[];
};

export default function CartList({ cartItems }: CartListProps) {
  return (
    <section
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Checkbox label="전체선택" />
      <ul
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {cartItems.map((cartItem, index) => {
          return <CartItemCard key={index} cartItem={cartItem} />;
        })}
      </ul>
    </section>
  );
}
