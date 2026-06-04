import info from '../../../assets/Info-outline.svg';
import { colors, typography } from '../../../shared/styles/theme';

const summarySectionStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  height: '42px',
  alignItems: 'center',
};

export default function OrderSummary() {
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
            70,000원
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
            3,000원
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
          73,000원
        </p>
      </div>
    </section>
  );
}
