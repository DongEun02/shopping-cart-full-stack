import type { CartItem } from './types';

export type CartAction =
  | { type: 'SET_ITEMS'; items: CartItem[] }
  | { type: 'CHANGE_ITEM_SELECTION'; id: string; checked: boolean }
  | { type: 'CHANGE_ALL_SELECTION'; checked: boolean }
  | { type: 'CHANGE_QUANTITY'; id: string; quantity: number }
  | { type: 'REMOVE_ITEM'; id: string };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.items;
    case 'CHANGE_ITEM_SELECTION':
      return state.map((item) =>
        item.product.id === action.id
          ? { ...item, isSelected: action.checked }
          : item,
      );
    case 'CHANGE_ALL_SELECTION':
      return state.map((item) => ({
        ...item,
        isSelected: action.checked,
      }));
    case 'CHANGE_QUANTITY':
      return state.map((item) =>
        item.product.id === action.id
          ? { ...item, quantity: action.quantity }
          : item,
      );

    case 'REMOVE_ITEM':
      return state.filter((item) => item.product.id !== action.id);
    default:
      return state;
  }
}
