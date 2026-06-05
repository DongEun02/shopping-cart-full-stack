import { useEffect, useReducer, useEffectEvent } from 'react';

import type { CartItem } from '../../../entities/cart/types';
import { useQuery } from '../../../shared/hooks/useQuery';
import {
  cartReducer,
  type CartAction,
} from '../../../entities/cart/cartReducer';
import { getSelectedItemIds } from '../../../entities/cart/selector';

type UseCartDependencies = {
  fetchItems: () => Promise<CartItem[]>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  loadSelectedItemIds: () => string[] | null;
  saveSelectedItemIds: (ids: string[]) => void;
};

export function useCart({
  fetchItems,
  updateItemQuantity,
  removeItem,
  loadSelectedItemIds,
  saveSelectedItemIds,
}: UseCartDependencies) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const {
    data: fetchedCartItems,
    isLoading,
    error,
  } = useQuery('cartItems', fetchItems);

  const findCartItem = (id: string) => {
    return cartItems.find((item) => item.product.id === id);
  };

  const replaceCartItemQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'CHANGE_QUANTITY', id, quantity });
  };

  const removeCartItem = (id: string) => {
    const action: CartAction = { type: 'REMOVE_ITEM', id };
    const nextCartItems = cartReducer(cartItems, action);

    dispatch(action);
    saveSelectedItemIds(getSelectedItemIds(nextCartItems));
  };

  const changeCartItemSelection = (id: string, checked: boolean) => {
    const action: CartAction = { type: 'CHANGE_ITEM_SELECTION', id, checked };
    const nextCartItems = cartReducer(cartItems, action);

    dispatch(action);
    saveSelectedItemIds(getSelectedItemIds(nextCartItems));
  };

  const changeAllCartItemsSelection = (checked: boolean) => {
    const action: CartAction = { type: 'CHANGE_ALL_SELECTION', checked };
    const nextCartItems = cartReducer(cartItems, action);

    dispatch(action);
    saveSelectedItemIds(getSelectedItemIds(nextCartItems));
  };

  const increaseQuantity = async (id: string) => {
    const currentItem = findCartItem(id);
    if (!currentItem) return;

    const nextQuantity = Math.min(99, currentItem.quantity + 1);

    try {
      await updateItemQuantity(id, nextQuantity);
      replaceCartItemQuantity(id, nextQuantity);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const decreaseQuantity = async (id: string) => {
    const currentItem = findCartItem(id);
    if (!currentItem) return;

    const nextQuantity = Math.max(1, currentItem.quantity - 1);

    try {
      await updateItemQuantity(id, nextQuantity);
      replaceCartItemQuantity(id, nextQuantity);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const removeCartItemById = async (id: string) => {
    const currentItem = findCartItem(id);
    if (!currentItem) return;

    try {
      await removeItem(id);
      removeCartItem(id);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const loadSelectedIds = useEffectEvent(() => {
    return loadSelectedItemIds();
  });

  useEffect(() => {
    if (!fetchedCartItems) return;

    const selectedCartItemIds = loadSelectedIds();

    dispatch({
      type: 'SET_ITEMS',
      items: fetchedCartItems.map((item) => ({
        ...item,
        isSelected: selectedCartItemIds
          ? selectedCartItemIds.includes(item.product.id)
          : true,
      })),
    });
  }, [fetchedCartItems]);

  return {
    cartItems,
    isLoading,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem: removeCartItemById,
    changeCartItemSelection,
    changeAllCartItemsSelection,
  };
}
