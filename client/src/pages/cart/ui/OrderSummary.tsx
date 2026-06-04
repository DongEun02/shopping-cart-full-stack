import info from '../../../assets/Info-outline.svg';
import { colors, typography } from '../../../shared/styles/theme';

type OrderSummaryProps = {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
};

const summarySectionStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  height: '42px',
  alignItems: 'center',
};

export default function OrderSummary({
  orderAmount,
  deliveryFee,
  totalAmount,
}: OrderSummaryProps) {
  return (
    <section
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <p
        css={{
          ...typography.label,
          color: colors.text,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <img src={info} alt="" width={16} height={16} />
        <span>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
      </p>

      <div
        css={{
          width: '100%',
          height: '1px',
          backgroundColor: '#eeeeee',
        }}
      />

      <div
        css={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div css={summarySectionStyle}>
          <p
            css={{
              ...typography.button,
            }}
          >
            주문 금액
          </p>
          <p
            css={{
              ...typography.title,
            }}
          >
            {orderAmount}원
          </p>
        </div>
        <div css={summarySectionStyle}>
          <p
            css={{
              ...typography.button,
            }}
          >
            배송비
          </p>
          <p
            css={{
              ...typography.title,
            }}
          >
            {deliveryFee}원
          </p>
        </div>
      </div>

      <div
        css={{
          width: '100%',
          height: '1px',
          backgroundColor: '#eeeeee',
        }}
      />

      <div css={summarySectionStyle}>
        <p
          css={{
            ...typography.button,
          }}
        >
          총 결제 금액
        </p>
        <p
          css={{
            ...typography.title,
          }}
        >
          {totalAmount.toLocaleString()}원
        </p>
      </div>
    </section>
  );
}
