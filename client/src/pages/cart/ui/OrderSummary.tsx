import info from '../../../assets/Info-outline.svg';
import Image from '../../../shared/ui/Image';
import Txt from '../../../shared/ui/Txt';
import Flex from '../../../shared/layout/Flex';
import Row from '../../../shared/layout/Row';

type OrderSummaryProps = {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
};

export default function OrderSummary({
  orderAmount,
  deliveryFee,
  totalAmount,
}: OrderSummaryProps) {
  return (
    <Flex
      as="section"
      direction="column"
      gap={12}
      styles={{ width: '100%' }}
    >
      <Txt
        variant="label"
        color="text"
      >
        <Flex as="span" gap={4} align="center">
          <Image
            src={info}
            alt=""
            ariaHidden
            width={16}
            height={16}
          />
          <span>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
        </Flex>
      </Txt>

      <Flex direction="column" gap={20} styles={{ width: '100%' }}>
        <div
          css={{
            width: '100%',
            height: '1px',
            backgroundColor: '#eeeeee',
          }}
        />
        <Row
          left={
            <Txt variant="button" color="text">
              주문 금액
            </Txt>
          }
          right={
            <Txt variant="title" color="black">
              {orderAmount.toLocaleString()}원
            </Txt>
          }
        />

        <Row
          left={
            <Txt variant="button" color="text">
              배송비
            </Txt>
          }
          right={
            <Txt variant="title" color="black">
              {deliveryFee.toLocaleString()}원
            </Txt>
          }
        />
        <div
          css={{
            width: '100%',
            height: '1px',
            backgroundColor: '#eeeeee',
          }}
        />

        <Row
          left={
            <Txt variant="button" color="text">
              총 결제 금액
            </Txt>
          }
          right={
            <Txt variant="title" color="black">
              {totalAmount.toLocaleString()}원
            </Txt>
          }
        />
      </Flex>
    </Flex>
  );
}
