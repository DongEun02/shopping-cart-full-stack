import { shoppingCart } from '../database/inMemoryDatabase.ts';
import { products } from '../database/inMemoryDatabase.ts';
import type { ProductId, Quantity } from '../types/type.ts';
import Product from '../domain/Product.ts';

export function createShoppingCart(productId: ProductId, quantity: Quantity) {
  shoppingCart.add({ productId, quantity });
}

export function getShoppingCart(): {
  product: Product | undefined;
  quantity: Quantity;
  isSelected: boolean;
}[] {
  const shoppingCartArray = shoppingCart.getShoppingCart();
  return shoppingCartArray.map(({ productId, quantity, isSelected }) => {
    return {
      product: products.get(productId),
      quantity,
      isSelected: !!isSelected,
    };
  });
}

export function patchShoppingCart(productId: ProductId, quantity: Quantity) {
  shoppingCart.setQuantity(productId, quantity);
}

export function patchShoppingCartSelection(
  productId: ProductId,
  isSelected: boolean,
) {
  shoppingCart.setSelection(productId, isSelected);
}

export function patchShoppingCartItem(
  productId: ProductId,
  {
    quantity,
    isSelected,
  }: {
    quantity?: Quantity;
    isSelected?: boolean;
  },
) {
  if (quantity !== undefined) {
    shoppingCart.setQuantity(productId, quantity);
  }

  if (isSelected !== undefined) {
    shoppingCart.setSelection(productId, isSelected);
  }
}

export function deleteShoppingCart(productId: ProductId) {
  shoppingCart.deleteProduct(productId);
}

export function hasShoppingCartProduct(productId: ProductId): boolean {
  return shoppingCart.hasProductId(productId);
}
