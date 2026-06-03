// entities/cart/ui/CartItem.tsx
import CheckBox from '../../../shared/ui/CheckBox';
import { colors, typography } from '../../../shared/styles/theme';

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

export default function CartItem() {
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

      {/* 나중에 이미지로 변경 */}
      <div
        css={{
          width: '112px',
          height: '112px',
          marginTop: '48px',
          borderRadius: '8px',
          backgroundColor: '#dddddd',
        }}
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
            상품이름
          </p>

          <p
            css={{
              ...typography.title,
              color: colors.black,
            }}
          >
            35,000원
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
            2
          </span>
          <button type="button" css={quantityButtonStyle}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}
