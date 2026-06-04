import Header from '../../shared/ui/Header';
import Button from '../../shared/ui/Button';
import OrderCheck from './ui/OrderCheck';
import { colors } from '../../shared/styles/theme';

export default function CheckoutPage() {
  return (
    <div
      css={{
        backgroundColor: colors.white,
        width: '430px',
        heigth: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header page="checkout" />
      <OrderCheck />
      <Button type="inactive" text="결제하기" />
    </div>
  );
}
