import type { CartItem } from '../../../entities/cart/types';
import CartItemCard from '../../../entities/cart/ui/CartItemCard';
import Checkbox from '../../../shared/ui/CheckBox';

type CartListProps = {
  cartItems: CartItem[];
  onIncrease: (id: string) => Promise<void>;
  onDecrease: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isAllSelected: boolean;
  onToggleItem: (id: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
};

export default function CartList({
  cartItems,
  onIncrease,
  onDecrease,
  onDelete,
  isAllSelected,
  onToggleItem,
  onToggleAll,
}: CartListProps) {
  return (
    <section
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Checkbox
        checked={isAllSelected}
        label="전체선택"
        onChange={onToggleAll}
      />
      <ul
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {cartItems.map((cartItem) => {
          return (
            <CartItemCard
              key={cartItem.product.id}
              cartItem={cartItem}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onDelete={onDelete}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>
    </section>
  );
}
