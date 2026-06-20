import Header from '../../shared/ui/Header';
import { BottomButton } from '../../shared/ui/Button';
import OrderCheck from './ui/OrderCheck';
import { colors } from '../../shared/styles/theme';
import { useNavigate } from 'react-router-dom';
import Flex from '../../shared/layout/Flex';

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      styles={{
        backgroundColor: colors.white,
        width: '430px',
        height: '100vh',
        margin: '0 auto',
      }}
    >
      <Header page="checkout" />
      <OrderCheck />
      <BottomButton disabled onClick={() => navigate('/pay')}>
        결제하기
      </BottomButton>
    </Flex>
  );
}
