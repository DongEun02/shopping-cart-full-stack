import { useOrderContext } from '../contexts/OrderContext';

export function useOrder() {
  const {
    order,
    isLoading,
    error,
    isModalOpen,
    coupons,
    selectedCouponCodes,
    couponDiscountAmount,
    isMutationLoading,
  } = useOrderContext();

  return {
    order,
    isLoading,
    error,
    isModalOpen,
    coupons,
    selectedCouponCodes,
    couponDiscountAmount,
    isMutationLoading,
  };
}
