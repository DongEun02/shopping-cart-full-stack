import { colors, typography } from '../styles/theme';
import back from '../../assets/back.svg';

export default function Header({ page }: { page: string }) {
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
      <img alt="뒤로가기" src={back} width={32} height={32} />
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
