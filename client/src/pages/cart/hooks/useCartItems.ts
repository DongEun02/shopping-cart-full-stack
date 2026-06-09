import { useCartContext } from '../contexts/CartContext';

export function useCartItems() {
  const { cartItems, isLoading, error } = useCartContext();

  return {
    cartItems,
    isLoading,
    error,
  };
}
