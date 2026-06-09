import { isAllCartItemsSelected } from '../../../entities/cart/selector';
import type { CartItem } from '../../../entities/cart/types';
import CartItemCard from '../../../entities/cart/ui/CartItemCard';
import Checkbox from '../../../shared/ui/CheckBox';
import { useCartItemActions } from '../hooks/useCartItemActions';
import { useCartQuantityActions } from '../hooks/useCartQuantityActions';
import { useCartSelectionActions } from '../hooks/useCartSelectionActions';

type CartListProps = {
  cartItems: CartItem[];
};

export default function CartList({ cartItems }: CartListProps) {
  const { increaseQuantity, decreaseQuantity } = useCartQuantityActions();
  const { removeCartItem } = useCartItemActions();
  const { changeCartItemSelection, changeAllCartItemsSelection } =
    useCartSelectionActions();

  const isAllSelected = isAllCartItemsSelected(cartItems);

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
        onChange={changeAllCartItemsSelection}
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
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={removeCartItem}
              onToggleItem={changeCartItemSelection}
            />
          );
        })}
      </ul>
    </section>
  );
}
