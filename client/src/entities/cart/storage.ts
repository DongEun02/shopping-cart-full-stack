import type { CartItem } from './types';

const SELECTED_CART_ITEM_IDS = 'selectedCartItemIds';

export function getSelectedCartItemIds(): string[] | null {
  const selectedCartItemIds = localStorage.getItem(SELECTED_CART_ITEM_IDS);

  if (!selectedCartItemIds) return null;

  try {
    return JSON.parse(selectedCartItemIds) as string[];
  } catch {
    return null;
  }
}

export function saveSelectedCartItemIds(cartItems: CartItem[]) {
  const selectedCartItemIds = cartItems
    .filter((item) => item.isSelected)
    .map((item) => item.product.id);

  localStorage.setItem(
    SELECTED_CART_ITEM_IDS,
    JSON.stringify(selectedCartItemIds),
  );
}
