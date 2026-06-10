import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from '../../entities/cart/api/cartApi';
import {
  getSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../../entities/cart/storage';
import CartPage from './CartPage';
import CartProvider from './providers/CartProvider';

export default function CartRoute() {
  return (
    <CartProvider
      fetchItems={fetchCartItems}
      updateItemQuantity={updateCartItemQuantity}
      removeItem={deleteCartItem}
      loadSelectedItemIds={getSelectedCartItemIds}
      saveSelectedItemIds={saveSelectedCartItemIds}
    >
      <CartPage />
    </CartProvider>
  );
}
