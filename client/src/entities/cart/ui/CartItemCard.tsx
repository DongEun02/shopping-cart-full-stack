// entities/cart/ui/CartItem.tsx
import CheckBox from '../../../shared/ui/CheckBox';
import { colors, typography } from '../../../shared/styles/theme';
import type { CartItem } from '../types';

type CartItemCardProps = {
  cartItem: CartItem;
};

const quantityButtonStyle = {
  width: '24px',
  height: '24px',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  backgroundColor: colors.white,
  color: colors.text,
  fontSize: '16px',
  padding: 0,
};

export default function CartItemCard({ cartItem }: CartItemCardProps) {
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
          top: '12px',
          left: 0,
        }}
      >
        <CheckBox />
      </div>

      <button
        type="button"
        css={{
          position: 'absolute',
          top: '12px',
          right: 0,
          width: '40px',
          height: '24px',
          border: '1px solid #e5e5e5',
          borderRadius: '4px',
          backgroundColor: colors.white,
          color: colors.text,
          ...typography.label,
        }}
      >
        삭제
      </button>

      <img
        css={{
          marginTop: '48px',
          borderRadius: '8px',
        }}
        src={cartItem.product.image}
        width={112}
        height={112}
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
          <p
            css={{
              marginBottom: '4px',
              color: colors.black,
              ...typography.label,
            }}
          >
            {cartItem.product.name}
          </p>

          <p
            css={{
              ...typography.title,
              color: colors.black,
            }}
          >
            {cartItem.product.price}
          </p>
        </div>

        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button type="button" css={quantityButtonStyle}>
            -
          </button>
          <span
            css={{
              color: colors.black,
              ...typography.label,
            }}
          >
            {cartItem.quantity}
          </span>
          <button type="button" css={quantityButtonStyle}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}
