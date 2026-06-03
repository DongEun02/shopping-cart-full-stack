// import checkedIcon from '../../assets/active-check.svg';
import uncheckedIcon from '../../assets/inactive-check.svg';
import { colors, typography } from '../styles/theme';

export default function Checkbox({ label }: { label?: string }) {
  return (
    <label css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="checkbox"
        css={{
          position: 'absolute',
          opacity: '0',
          pointerEvents: 'none',
        }}
      />
      <img src={uncheckedIcon} alt="" width={24} height={24} />
      <span
        css={{
          ...typography.label,
          color: colors.text,
        }}
      >
        {label}
      </span>
    </label>
  );
}
