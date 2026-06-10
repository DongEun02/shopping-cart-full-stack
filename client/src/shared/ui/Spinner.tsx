import { colors } from '../styles/theme';

export default function Spinner() {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      css={{
        width: '40px',
        height: '40px',
        border: `4px solid ${colors.inactive}`,
        borderTopColor: colors.black,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',

        '@keyframes spin': {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      }}
    />
  );
}
