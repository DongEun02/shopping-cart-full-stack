import Flex from '../../../shared/layout/Flex';
import Row from '../../../shared/layout/Row';
import Txt from '../../../shared/ui/Txt';
import Image from '../../../shared/ui/Image';
import { CouponButton } from '../../../shared/ui/Button';
import vector from '../../../assets/vector.svg';
import info from '../../../assets/Info-outline.svg';
import { colors } from '../../../shared/styles/theme';
import List from '../../../shared/layout/List';
import Coupon from '../../../entities/coupon/ui/Coupon';

type ModalProps = {
  onClick: () => void;
  onSubmit: () => void;
};

export default function Modal({ onClick, onSubmit }: ModalProps) {
  return (
    <Flex
      direction="column"
      gap={32}
      styles={{
        width: '382px',
        height: '614px',
        position: 'absolute',
        top: '161px',
        left: '24px',
        backgroundColor: colors.white,
        zIndex: 2,
        borderRadius: '8px',
        padding: '24px 30px',
      }}
    >
      <Row
        left={
          <Txt variant="modal" color="black">
            쿠폰을 선택해 주세요
          </Txt>
        }
        right={
          <Image
            src={vector}
            width={14}
            height={14}
            alt="모달 닫기"
            onClick={onClick}
            styles={{ cursor: 'pointer' }}
          />
        }
      />
      <Flex direction="column" gap={16}>
        <Flex as="span" gap={4} align="center">
          <Image src={info} alt="" ariaHidden width={16} height={16} />
          <Txt variant="label" color="text">
            쿠폰은 최대 2개까지 사용할 수 있습니다.
          </Txt>
        </Flex>
        <List>
          <Coupon />
          <Coupon />
          <Coupon />
          <Coupon />
        </List>
      </Flex>
      <CouponButton isInModal={true} onClick={onSubmit}>
        총 6,000원 할인 쿠폰 사용하기
      </CouponButton>
    </Flex>
  );
}
