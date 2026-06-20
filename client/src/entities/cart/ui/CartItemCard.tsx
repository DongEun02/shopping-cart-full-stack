import CheckBox from '../../../shared/ui/CheckBox';
import Txt from '../../../shared/ui/Txt';
import { DeleteButton, QuantityButton } from '../../../shared/ui/Button';
import ListItem from '../../../shared/layout/ListItem';
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
    <ListItem
      left={
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <CheckBox
            checked={cartItem.isSelected}
            onChange={(checked) => onToggleItem(cartItem.product.id, checked)}
          />
          <img
            css={{ borderRadius: '8px' }}
            src={cartItem.product.image ?? undefined}
            width={112}
            height={112}
            alt="상품 이미지"
          />
        </div>
      }
      center={
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            paddingTop: '36px',
          }}
        >
          <div>
            <Txt
              variant="label"
              color="black"
              styles={{ marginBottom: '4px' }}
            >
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
            <QuantityButton onClick={() => onDecrease(cartItem.product.id)}>
              -
            </QuantityButton>
            <Txt variant="label" color="black">
              {cartItem.quantity}
            </Txt>
            <QuantityButton onClick={() => onIncrease(cartItem.product.id)}>
              +
            </QuantityButton>
          </div>
        </div>
      }
      right={
        <DeleteButton onClick={() => onDelete(cartItem.product.id)}>
          삭제
        </DeleteButton>
      }
    />
  );
}
