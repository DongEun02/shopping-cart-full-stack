import CheckBox from '../../../shared/ui/CheckBox';
import Txt from '../../../shared/ui/Txt';
import {
  DeleteButton,
  QuantityButton,
} from '../../../shared/ui/Button';
import type { CartItem } from '../types';

type CartItemCardProps = {
  cartItem: CartItem;
  onIncrease: (id: string) => Promise<void>;
  onDecrease: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleItem: (id: string, checked: boolean) => void;
};

export default function CartItemCard({
  cartItem,
  onIncrease,
  onDecrease,
  onDelete,
  onToggleItem,
}: CartItemCardProps) {
  return (
    <li
      css={{
        position: 'relative',
        display: 'flex',
        gap: '12px',
        borderTop: '1px solid #eeeeee',
      }}
    >
      <div
        css={{
          position: 'absolute',
          width: '100%',
          top: '12px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CheckBox
          checked={cartItem.isSelected}
          onChange={(checked) => onToggleItem(cartItem.product.id, checked)}
        />
        <DeleteButton onClick={() => onDelete(cartItem.product.id)} />
      </div>

      <img
        css={{
          marginTop: '48px',
          borderRadius: '8px',
        }}
        src={cartItem.product.image ?? undefined}
        width={112}
        height={112}
        alt="상품 이미지"
      />

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          paddingTop: '48px',
        }}
      >
        <div>
          <Txt variant="label" color="black" styles={{ marginBottom: '4px' }}>
            {cartItem.product.name}
          </Txt>

          <Txt variant="title" color="black">
            {cartItem.product.price.toLocaleString()}원
          </Txt>
        </div>

        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <QuantityButton
            onClick={() => onDecrease(cartItem.product.id)}
          >
            -
          </QuantityButton>
          <Txt variant="label" color="black">
            {cartItem.quantity}
          </Txt>
          <QuantityButton
            onClick={() => onIncrease(cartItem.product.id)}
          >
            +
          </QuantityButton>
        </div>
      </div>
    </li>
  );
}
