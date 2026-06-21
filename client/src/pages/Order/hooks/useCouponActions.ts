import type {
  CouponCode,
  CouponDiscount,
} from '../../../entities/coupon/types';
import type { Order } from '../../../entities/order/types';
import { setQueryData } from '../../../shared/hooks/useQuery';
import { useOrderContext } from '../contexts/OrderContext';

export function useCouponActions() {
  const {
    orderId,
    selectedCouponCodes,
    isMutationLoading,
    mutate,
    fetchOrder,
    calculateDiscount,
    updateCoupons,
    dispatchOrderAction,
  } = useOrderContext();

  const openCouponModal = () => {
    dispatchOrderAction({ type: 'OPEN_COUPON_MODAL' });
  };

  const closeCouponModal = () => {
    dispatchOrderAction({ type: 'CLOSE_COUPON_MODAL' });
  };

  const changeCouponSelection = async (
    couponCode: CouponCode,
    checked: boolean,
  ) => {
    const nextCouponCodes = checked
      ? [...selectedCouponCodes, couponCode]
      : selectedCouponCodes.filter((code) => code !== couponCode);

    if (nextCouponCodes.length > 2 || isMutationLoading) return;

    const result: { current: CouponDiscount | null } = { current: null };

    try {
      await mutate(async () => {
        result.current = await calculateDiscount(orderId, nextCouponCodes);
      });

      if (!result.current) return;

      dispatchOrderAction({
        type: 'SET_COUPON_SELECTION',
        couponCodes: nextCouponCodes,
        discountAmount: result.current.discountAmount,
      });
    } catch {
      return;
    }
  };

  const submitCoupons = async () => {
    if (isMutationLoading) return;

    try {
      await mutate(async () => {
        await updateCoupons(orderId, selectedCouponCodes);
        const order = await fetchOrder(orderId);

        dispatchOrderAction({ type: 'SET_ORDER', order });
        setQueryData<Order>(`order:${orderId}`, () => order);
        dispatchOrderAction({ type: 'CLOSE_COUPON_MODAL' });
      });
    } catch {
      return;
    }
  };

  return {
    openCouponModal,
    closeCouponModal,
    changeCouponSelection,
    submitCoupons,
  };
}
