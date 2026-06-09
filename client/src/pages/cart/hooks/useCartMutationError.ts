import { useCartContext } from '../contexts/CartContext';

export function useCartMutationError() {
  const { mutationError } = useCartContext();

  return mutationError;
}
