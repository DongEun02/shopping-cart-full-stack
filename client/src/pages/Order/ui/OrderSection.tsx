import type { ReactNode } from 'react';
import Flex from '../../../shared/layout/Flex';
import Txt from '../../../shared/ui/Txt';

type OrderSectionProps = {
  productTypeCount: number;
  productCount: number;
  children: ReactNode;
};

export default function OrderSection({
  productTypeCount,
  productCount,
  children,
}: OrderSectionProps) {
  return (
    <Flex
      as="section"
      direction="column"
      gap={36}
      styles={{
        height: '75vh',
        overflowY: 'scroll',
        width: '100%',
        padding: '0 24px',
      }}
    >
      <Flex direction="column" gap={12}>
        <Txt variant="title" color="black">
          주문 확인
        </Txt>
        <Txt variant="label" color="text">
          총 {productTypeCount}종류의 상품 {productCount}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Txt>
      </Flex>
      {children}
    </Flex>
  );
}
