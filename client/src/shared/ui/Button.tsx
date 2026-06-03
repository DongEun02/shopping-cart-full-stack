import { colors, typography } from '../styles/theme';

export default function Button({ type, text }: { type: string; text: string }) {
  const background = type === 'active' ? colors.black : colors.inactive;

  return (
    <button
      css={{
        width: '430px',
        height: '64px',
        ...typography.button,
        backgroundColor: background,
        color: colors.white,
        position: 'fixed',
        bottom: '0',
      }}
    >
      {text}
    </button>
  );
}
