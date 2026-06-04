import type { CartItem } from '../../../entities/cart/types';
import CartItemCard from '../../../entities/cart/ui/CartItemCard';
import Checkbox from '../../../shared/ui/CheckBox';

type CartListProps = {
  cartItems: CartItem[];
  handleIncrease: (id: string) => Promise<void>;
  handleDecrease: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  isAllSelected: boolean;
  handleToggleItem: (id: string, checked: boolean) => void;
  handleToggleAll: (checked: boolean) => void;
};

export default function CartList({
  cartItems,
  handleIncrease,
  handleDecrease,
  handleDelete,
  isAllSelected,
  handleToggleItem,
  handleToggleAll,
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
        onChange={handleToggleAll}
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
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleDelete={handleDelete}
              handleToggleItem={handleToggleItem}
            />
          );
        })}
      </ul>
    </section>
  );
}
