import type { ReactNode } from 'react';
import { colors, typography } from '../../../shared/styles/theme';

type CartSectionProps = {
  cartItemsCount: number;
  children: ReactNode;
};

export default function CartSection({
  cartItemsCount,
  children,
}: CartSectionProps) {
  // 상품이 없는 경우
  if (cartItemsCount === 0) {
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
          현재 {cartItemsCount}종류의 상품이 담겨있습니다.
        </p>
      </div>
      {children}
    </section>
  );
}
