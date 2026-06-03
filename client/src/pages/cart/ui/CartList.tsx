import CartItem from '../../../entities/cart/ui/CartItem';
import Checkbox from '../../../shared/ui/CheckBox';

export default function CartList() {
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
        <CartItem />
        <CartItem />
      </ul>
    </section>
  );
}
