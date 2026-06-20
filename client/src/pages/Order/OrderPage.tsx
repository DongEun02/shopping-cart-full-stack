import { colors } from '../../shared/styles/theme';
import Flex from '../../shared/layout/Flex';
import Header from '../../shared/ui/Header';
import Image from '../../shared/ui/Image';
import back from '../../assets/back.svg';
import OrderSection from './ui/OrderSection';
import { useNavigate } from 'react-router-dom';
import OrderList from './ui/OrderList';
import { BottomButton } from '../../shared/ui/Button';

export default function OrderPage() {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      gap={36}
      align="center"
      styles={{
        backgroundColor: colors.white,
        width: '430px',
        minHeight: '100vh',
        margin: '0 auto',
      }}
    >
      <Header>
        <Image
          alt="뒤로가기"
          src={back}
          width={32}
          height={32}
          onClick={() => navigate('/')}
          styles={{ cursor: 'pointer' }}
        />
      </Header>
      <OrderSection>
        <OrderList />
      </OrderSection>
      <BottomButton onClick={() => navigate('/payment-checkout')}>
        결제하기
      </BottomButton>
    </Flex>
  );
}
