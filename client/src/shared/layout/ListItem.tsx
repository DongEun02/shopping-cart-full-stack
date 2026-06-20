import type { ReactNode } from 'react';

type ListItemProps = {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
};

export default function ListItem({ left, center, right }: ListItemProps) {
  return (
    <li
      css={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '12px',
        padding: '20px 0',
        borderTop: '1px solid #eeeeee',
      }}
    >
      {left}
      {center}
      {right}
    </li>
  );
}
