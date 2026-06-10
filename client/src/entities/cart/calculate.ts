import type { CartItem } from './types';

export const DEFAULT_DELIVERY_FEE = 3000;
export const FREE_DELIVERY_THRESHOLD = 100000;

export function calculateOrderAmount(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

export function calculateDeliveryFee(amount: number): number {
  return amount >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE;
}

export function calculateTotalAmount(
  orderAmount: number,
  deliveryFee: number,
): number {
  return orderAmount + deliveryFee;
}
