import { colors, typography } from '../styles/theme';

type ButtonProps = {
  type: string;
  text: string;
  onClick: () => void;
};

export default function Button({ type, text, onClick }: ButtonProps) {
  const background = type === 'active' ? colors.black : colors.inactive;
  const isActive = type === 'active' ? false : true;

  return (
    <button
      disabled={isActive}
      onClick={onClick}
      css={{
        width: '430px',
        height: '64px',
        ...typography.button,
        backgroundColor: background,
        color: colors.white,
        position: 'fixed',
        bottom: '0',
        border: 'none',
      }}
    >
      {text}
    </button>
  );
}
