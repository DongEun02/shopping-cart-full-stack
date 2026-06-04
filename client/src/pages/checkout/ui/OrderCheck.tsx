import { colors, typography } from '../../../shared/styles/theme';

export default function OrderCheck() {
  return (
    <section
      css={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        css={{
          color: colors.text,
          ...typography.title,
        }}
      >
        주문 확인
      </p>
      <p
        css={{
          color: colors.text,
          ...typography.label,
          textAlign: 'center',
        }}
      >
        총 2종류의 상품 4개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </p>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <p
          css={{
            color: colors.text,
            ...typography.button,
          }}
        >
          총 결제 금액
        </p>
        <p
          css={{
            color: colors.text,
            ...typography.title,
          }}
        >
          120,000원
        </p>
      </div>
    </section>
  );
}
