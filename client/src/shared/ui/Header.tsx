import { colors } from '../styles/theme';
import back from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import Flex from '../layout/Flex';
import Txt from './Txt';

export default function Header({ page }: { page: string }) {
  const navigate = useNavigate();

  const text =
    page === 'cart' ? (
      <Txt variant="header" color="white">
        SHOP
      </Txt>
    ) : (
      <img
        alt="뒤로가기"
        src={back}
        width={32}
        height={32}
        onClick={() => navigate('/')}
        css={{ cursor: 'pointer' }}
      />
    );

  return (
    <Flex
      as="header"
      align="center"
      styles={{
        backgroundColor: colors.black,
        height: '64px',
        width: '100%',
        padding: '0 24px',
      }}
    >
      {text}
    </Flex>
  );
}
