import { colors, typography } from '../../../shared/styles/theme';
import CartList from './CartList';

export default function CartSection() {
  return (
    <section
      css={{
        minWidth: '90%',
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
          현재 2종류의 상품이 담겨있습니다.
        </p>
      </div>
      <CartList />
    </section>
  );
}
