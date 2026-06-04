import Product from '../domain/Product.ts';
import ShoppingCart from '../domain/ShoppingCart.ts';
import type { ProductId } from '../types/type.ts';

export const products = new Map<ProductId, Product>();
export const shoppingCart = new ShoppingCart();

const seedProducts = [
  new Product({
    name: '상품이름A',
    price: 35000,
    image: 'http://localhost:3000/images/productA.svg',
  }),
  new Product({
    name: '상품이름B',
    price: 25000,
    image: 'http://localhost:3000/images/productB.svg',
  }),
];

seedProducts.forEach((product) => {
  const productId = product.getProduct().id;

  products.set(productId, product);
  shoppingCart.add({
    productId,
    quantity: 2,
  });
});
