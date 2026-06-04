import Header from '../../shared/ui/Header';
import Button from '../../shared/ui/Button';
import OrderCheck from './ui/OrderCheck';
import { colors } from '../../shared/styles/theme';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();

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
      <Button
        type="inactive"
        text="결제하기"
        onClick={() => navigate('/pay')}
      />
    </div>
  );
}
