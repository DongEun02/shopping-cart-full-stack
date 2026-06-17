import type {
  BogoCoupon,
  FixedAmountCoupon,
  FreeShippingCoupon,
  OrderData,
  PercentageCoupon,
} from '../types/type.ts';

const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const getCurrentTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export function calculateFixedAmountDiscount(
  order: OrderData,
  coupon: FixedAmountCoupon,
) {
  if (order.amount.orderAmount < coupon.minOrderAmount) {
    return 0;
  }

  return coupon.discountAmount;
}

export function calculateBogoDiscount(order: OrderData, coupon: BogoCoupon) {
  const discountProduct = order.products
    .filter((product) => product.quantity >= coupon.minCount)
    .sort((a, b) => b.price - a.price)[0];

  if (!discountProduct) {
    return 0;
  }

  return discountProduct.price * coupon.freeCount;
}

export function calculateFreeShippingDiscount(
  order: OrderData,
  coupon: FreeShippingCoupon,
) {
  if (order.amount.orderAmount < coupon.minOrderAmount) {
    return 0;
  }

  const discountLimit = order.isRemoteArea
    ? coupon.discountAmount + coupon.remoteAreaFee
    : coupon.discountAmount;

  return Math.min(order.amount.shippingFee, discountLimit);
}

export function calculatePercentageDiscount(
  order: OrderData,
  coupon: PercentageCoupon,
  currentDate = new Date(),
) {
  const currentTime = getCurrentTime(currentDate);
  const currentMinutes = convertTimeToMinutes(currentTime);
  const startMinutes = convertTimeToMinutes(coupon.startTime);
  const endMinutes = convertTimeToMinutes(coupon.endTime);

  if (currentMinutes < startMinutes || currentMinutes >= endMinutes) {
    return 0;
  }

  return Math.floor((order.amount.orderAmount * coupon.discountRate) / 100);
}
