import {
  useEffect,
  useReducer,
  useEffectEvent,
  type ReactNode,
} from 'react';

import { cartReducer, type CartAction } from '../../../entities/cart/cartReducer';
import { getSelectedItemIds } from '../../../entities/cart/selector';
import type { CartItem } from '../../../entities/cart/types';
import { useMutation } from '../../../shared/hooks/useMutation';
import { useQuery } from '../../../shared/hooks/useQuery';
import { CartContext } from '../contexts/CartContext';

type CartProviderProps = {
  children: ReactNode;
  fetchItems: () => Promise<CartItem[]>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  loadSelectedItemIds: () => string[] | null;
  saveSelectedItemIds: (ids: string[]) => void;
};

export default function CartProvider({
  children,
  fetchItems,
  updateItemQuantity,
  removeItem,
  loadSelectedItemIds,
  saveSelectedItemIds,
}: CartProviderProps) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const {
    data: fetchedCartItems,
    isLoading,
    error,
  } = useQuery('cartItems', fetchItems);

  const { mutate, isMutationLoading, error: mutationError } = useMutation();

  const dispatchCartAction = (action: CartAction) => {
    const nextCartItems = cartReducer(cartItems, action);

    dispatch(action);
    saveSelectedItemIds(getSelectedItemIds(nextCartItems));
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        mutationError,
        isMutationLoading,
        mutate,
        updateItemQuantity,
        removeItem,
        dispatchCartAction,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
