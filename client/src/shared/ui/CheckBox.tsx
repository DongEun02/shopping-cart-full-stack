import checkedIcon from '../../assets/active-check.svg';
import uncheckedIcon from '../../assets/inactive-check.svg';
import Image from './Image';
import Txt from './Txt';
import { typography } from '../styles/theme';

type CheckboxProps = {
  variant?: keyof typeof typography;
  checked: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
};

export default function Checkbox({
  variant = 'label',
  checked,
  label,
  onChange,
}: CheckboxProps) {
  return (
    <label
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        css={{
          position: 'absolute',
          opacity: '0',
          pointerEvents: 'none',
        }}
      />
      <Image
        src={checked ? checkedIcon : uncheckedIcon}
        alt=""
        ariaHidden
        width={24}
        height={24}
      />
      {label && (
        <Txt variant={variant} color="text">
          {label}
        </Txt>
      )}
    </label>
  );
}
