import type { CartItem } from './types';

export function getSelectedItemIds(cartItems: CartItem[]) {
  return cartItems
    .filter((item) => item.isSelected)
    .map((item) => item.product.id);
}
