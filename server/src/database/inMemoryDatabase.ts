import Product from '../domain/Product.ts';
import ShoppingCart from '../domain/ShoppingCart.ts';
import type { ProductId } from '../types/type.ts';

export const products = new Map<ProductId, Product>();
export const shoppingCart = new ShoppingCart();

const getServerBaseUrl = () => {
  if (process.env.SERVER_BASE_URL) {
    return process.env.SERVER_BASE_URL;
  }

  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }

  return 'http://localhost:3000';
};

const createImageUrl = (fileName: string) => {
  return `${getServerBaseUrl()}/images/${fileName}`;
};

const seedProducts = [
  new Product({
    name: '상품이름A',
    price: 35000,
    image: createImageUrl('productA.svg'),
  }),
  new Product({
    name: '상품이름B',
    price: 25000,
    image: createImageUrl('productB.svg'),
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
