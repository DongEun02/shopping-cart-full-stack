import { colors } from '../../shared/styles/theme';
import Header from '../../shared/ui/Header';
import CartSection from './ui/CartSection';

export default function CartPage() {
  return (
    <div
      css={{
        backgroundColor: colors.white,
        width: '430px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        gap: '36px',
      }}
    >
      <Header page="cart" />
      <CartSection />
    </div>
  );
}
