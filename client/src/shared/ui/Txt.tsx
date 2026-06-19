import type { ReactNode } from 'react';
import { colors, typography } from '../styles/theme';

const font = {
  header: {
    ...typography.header,
    verticalAlign: 'center',
  },
  title: {
    ...typography.title,
  },
  label: {
    ...typography.label,
  },
  button: {
    ...typography.button,
  },
  info: {
    ...typography.info,
  },
};

export default function Txt({
  variant,
  color,
  styles,
  children,
}: {
  variant: keyof typeof typography;
  color?: keyof typeof colors;
  styles?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <p css={{ ...font[variant], color: colors[color], ...styles }}>
      {children}
    </p>
  );
}
