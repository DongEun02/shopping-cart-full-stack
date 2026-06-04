import { useEffect, useState } from 'react';

import type { CartItem } from '../../../entities/cart/types';
import { useQuery } from '../../../shared/hooks/useQuery';

type UseCartDependencies = {
  fetchItems: () => Promise<CartItem[]>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  loadSelectedItemIds: () => string[] | null;
  saveSelectedItems: (cartItems: CartItem[]) => void;
};

export function useCart({
  fetchItems,
  updateItemQuantity,
  removeItem,
  loadSelectedItemIds,
  saveSelectedItems,
}: UseCartDependencies) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const {
    data: fetchedCartItems,
    isLoading,
    error,
  } = useQuery('cartItems', fetchItems);

  const findCartItem = (id: string) => {
    return cartItems.find((item) => item.product.id === id);
  };

  const replaceCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => {
      const nextCartItems = prev.filter((item) => item.product.id !== id);

      saveSelectedItems(nextCartItems);

      return nextCartItems;
    });
  };

  const changeCartItemSelection = (id: string, checked: boolean) => {
    setCartItems((prev) => {
      const nextCartItems = prev.map((item) =>
        item.product.id === id ? { ...item, isSelected: checked } : item,
      );

      saveSelectedItems(nextCartItems);

      return nextCartItems;
    });
  };

  const changeAllCartItemsSelection = (checked: boolean) => {
    setCartItems((prev) => {
      const nextCartItems = prev.map((item) => ({
        ...item,
        isSelected: checked,
      }));

      saveSelectedItems(nextCartItems);

      return nextCartItems;
    });
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
        console.log(error.message);
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
        console.log(error.message);
      }
    }
  };

  const removeCartItemById = async (id: string) => {
    const currentItem = findCartItem(id);
    if (!currentItem) return;

    try {
      await removeItem(id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    removeCartItem(id);
  };

  useEffect(() => {
    if (!fetchedCartItems) return;

    const cartItems = fetchedCartItems;

    function syncCartItems() {
      const selectedCartItemIds = loadSelectedItemIds();

      setCartItems(
        cartItems.map((item) => ({
          ...item,
          isSelected: selectedCartItemIds
            ? selectedCartItemIds.includes(item.product.id)
            : true,
        })),
      );
    }

    syncCartItems();
  }, [fetchedCartItems, loadSelectedItemIds]);

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
