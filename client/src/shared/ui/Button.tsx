import type { ReactNode } from 'react';
import { colors, typography } from '../styles/theme';

type ButtonProps = {
  type: string;
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ type, onClick, children }: ButtonProps) {
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
      {children}
    </button>
  );
}
