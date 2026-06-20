import Row from '../../../shared/layout/Row';
import Checkbox from '../../../shared/ui/CheckBox';
import Txt from '../../../shared/ui/Txt';
import Flex from '../../../shared/layout/Flex';

export default function Coupon() {
  const handleSelectedCoupon = () => {
    // 쿠폰 선택 api 호출
  };

  return (
    <li
      css={{
        padding: '12px 0 20px 0',
        borderTop: '1px solid #eeeeee',
      }}
    >
      <Row
        left={
          <Flex direction="column" gap={12}>
            <Checkbox
              variant="button"
              checked={true}
              label="5,000원 할인 쿠폰"
              onChange={handleSelectedCoupon}
            />
            <Txt variant="label" color="text">
              만료일: 2024년 11월 30일 <br />
              최소 주문 금액: 100,000원
            </Txt>
          </Flex>
        }
      />
    </li>
  );
}
