import { useEffect, useState } from 'react';

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
import {
  calculateCouponDiscount,
  fetchOrderCoupons,
} from '../../../entities/coupon/api/couponApi';
import type {
  Coupon as CouponType,
  CouponCode,
} from '../../../entities/coupon/types';
import Spinner from '../../../shared/ui/Spinner';

type ModalProps = {
  orderId: string;
  initialDiscountAmount: number;
  onClose: () => void;
  onSubmit: (couponCodes: CouponCode[]) => Promise<void>;
};

export default function Modal({
  orderId,
  initialDiscountAmount,
  onClose,
  onSubmit,
}: ModalProps) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCouponCodes, setSelectedCouponCodes] = useState<CouponCode[]>(
    [],
  );
  const [discountAmount, setDiscountAmount] = useState(initialDiscountAmount);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchOrderCoupons(orderId)
      .then((response) => {
        if (ignore) return;

        setCoupons(response);
        setSelectedCouponCodes(
          response.filter(({ isSelected }) => isSelected).map(({ id }) => id),
        );
      })
      .catch((error) => {
        if (ignore) return;

        setError(
          error instanceof Error
            ? error
            : new Error('알 수 없는 에러가 발생했습니다.'),
        );
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [orderId]);

  const changeCouponSelection = async (
    couponCode: CouponCode,
    checked: boolean,
  ) => {
    const nextCouponCodes = checked
      ? [...selectedCouponCodes, couponCode]
      : selectedCouponCodes.filter((code) => code !== couponCode);

    if (nextCouponCodes.length > 2 || isCalculating) return;

    setIsCalculating(true);

    try {
      const result = await calculateCouponDiscount(orderId, nextCouponCodes);

      setSelectedCouponCodes(nextCouponCodes);
      setDiscountAmount(result.discountAmount);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생했습니다.',
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const submitCoupons = async () => {
    if (isSubmitting || isCalculating) return;

    setIsSubmitting(true);

    try {
      await onSubmit(selectedCouponCodes);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onClick={onClose}
            styles={{ cursor: 'pointer' }}
          />
        }
      />
      <Flex direction="column" gap={16} styles={{ flex: 1, minHeight: 0 }}>
        <Flex as="span" gap={4} align="center">
          <Image src={info} alt="" ariaHidden width={16} height={16} />
          <Txt variant="label" color="text">
            쿠폰은 최대 2개까지 사용할 수 있습니다.
          </Txt>
        </Flex>
        <Flex
          align="center"
          justify="center"
          styles={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
        >
          {isLoading && <Spinner />}
          {error && (
            <Txt variant="label" color="error">
              {error.message}
            </Txt>
          )}
          {!isLoading && !error && (
            <List>
              {coupons.map((coupon) => (
                <Coupon
                  key={coupon.id}
                  coupon={coupon}
                  checked={selectedCouponCodes.includes(coupon.id)}
                  onChange={(checked) =>
                    changeCouponSelection(coupon.id, checked)
                  }
                />
              ))}
            </List>
          )}
        </Flex>
      </Flex>
      <CouponButton
        isInModal={true}
        disabled={isLoading || !!error || isCalculating || isSubmitting}
        onClick={submitCoupons}
      >
        총 {discountAmount.toLocaleString()}원 할인 쿠폰 사용하기
      </CouponButton>
    </Flex>
  );
}
