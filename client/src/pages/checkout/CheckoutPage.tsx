import back from '../../assets/back.svg';
import Header from '../../shared/ui/Header';
import Image from '../../shared/ui/Image';
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
      <OrderCheck />
      <BottomButton disabled onClick={() => navigate('/pay')}>
        결제하기
      </BottomButton>
    </Flex>
  );
}
