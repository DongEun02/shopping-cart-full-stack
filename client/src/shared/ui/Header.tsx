import { colors, typography } from '../styles/theme';
import back from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';

export default function Header({ page }: { page: string }) {
  const navigate = useNavigate();

  const text =
    page === 'cart' ? (
      <p
        css={{
          ...typography.header,
          color: colors.white,
          verticalAlign: 'middle',
        }}
      >
        SHOP
      </p>
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
    <header
      css={{
        backgroundColor: colors.black,
        height: '64px',
        width: '100%',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {text}
    </header>
  );
}
