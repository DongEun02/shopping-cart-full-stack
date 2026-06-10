import { useCartContext } from '../contexts/CartContext';

export function useCartSelectionActions() {
  const { dispatchCartAction } = useCartContext();

  const changeCartItemSelection = (id: string, checked: boolean) => {
    dispatchCartAction({ type: 'CHANGE_ITEM_SELECTION', id, checked });
  };

  const changeAllCartItemsSelection = (checked: boolean) => {
    dispatchCartAction({ type: 'CHANGE_ALL_SELECTION', checked });
  };

  return {
    changeCartItemSelection,
    changeAllCartItemsSelection,
  };
}
