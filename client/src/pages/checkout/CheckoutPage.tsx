import Header from '../../shared/ui/Header';
import { BottomButton } from '../../shared/ui/Button';
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
      <BottomButton disabled onClick={() => navigate('/pay')}>
        결제하기
      </BottomButton>
    </div>
  );
}
