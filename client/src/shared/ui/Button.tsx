import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

import { colors, typography } from '../styles/theme';

type BaseButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  styles?: CSSObject;
};

function BaseButton({
  children,
  disabled = false,
  onClick,
  styles,
}: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      css={{
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...styles,
      }}
    >
      {children}
    </button>
  );
}

type BottomButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

export function BottomButton({
  children,
  disabled = false,
  onClick,
}: BottomButtonProps) {
  return (
    <BaseButton
      disabled={disabled}
      onClick={onClick}
      styles={{
        width: '430px',
        height: '64px',
        position: 'fixed',
        bottom: 0,
        backgroundColor: disabled ? colors.inactive : colors.black,
        color: colors.white,
        ...typography.button,
      }}
    >
      {children}
    </BaseButton>
  );
}

type QuantityButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function QuantityButton({ children, onClick }: QuantityButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      styles={{
        width: '24px',
        height: '24px',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        backgroundColor: colors.white,
        color: colors.text,
        fontSize: '16px',
      }}
    >
      {children}
    </BaseButton>
  );
}

type DeleteButtonProps = {
  onClick: () => void;
};

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      styles={{
        width: '40px',
        height: '24px',
        border: '1px solid #e5e5e5',
        borderRadius: '4px',
        backgroundColor: colors.white,
        color: colors.text,
        ...typography.label,
      }}
    >
      삭제
    </BaseButton>
  );
}
