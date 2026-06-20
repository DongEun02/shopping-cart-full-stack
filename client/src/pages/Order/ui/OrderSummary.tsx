import info from '../../../assets/Info-outline.svg';
import Image from '../../../shared/ui/Image';
import Txt from '../../../shared/ui/Txt';
import Flex from '../../../shared/layout/Flex';
import Row from '../../../shared/layout/Row';

export default function CartSummary() {
  return (
    <Flex as="section" direction="column" gap={12} styles={{ width: '100%' }}>
      <Flex as="span" gap={4} align="center">
        <Image src={info} alt="" ariaHidden width={16} height={16} />
        <Txt variant="label" color="text">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Txt>
      </Flex>

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
              70,000원
            </Txt>
          }
        />

        <Row
          left={
            <Txt variant="button" color="text">
              쿠폰 할인 금액
            </Txt>
          }
          right={
            <Txt variant="title" color="black">
              -6,000원
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
              6,000원
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
              70,000원
            </Txt>
          }
        />
      </Flex>
    </Flex>
  );
}
