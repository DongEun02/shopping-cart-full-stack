import info from '../../../assets/Info-outline.svg';
import Txt from '../../../shared/ui/Txt';

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
      <Txt
        variant="label"
        color="text"
        styles={{ display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <img src={info} alt="" width={16} height={16} />
        <span>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
      </Txt>

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
          <Txt variant="button" color="text">
            주문 금액
          </Txt>
          <Txt variant="title" color="black">
            {orderAmount.toLocaleString()}원
          </Txt>
        </div>
        <div css={summarySectionStyle}>
          <Txt variant="button" color="text">
            배송비
          </Txt>
          <Txt variant="title" color="black">
            {deliveryFee.toLocaleString()}원
          </Txt>
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
        <Txt variant="button" color="text">
          총 결제 금액
        </Txt>
        <Txt variant="title" color="black">
          {totalAmount.toLocaleString()}원
        </Txt>
      </div>
    </section>
  );
}
