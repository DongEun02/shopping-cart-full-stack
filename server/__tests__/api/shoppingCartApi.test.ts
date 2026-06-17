import request from 'supertest';
import app from '../../src/app';
import { describe, expect, test } from '@jest/globals';

import { createProduct } from '../../src/service/productService';
import {
  createShoppingCart,
  patchShoppingCart,
  getShoppingCart,
} from '../../src/service/shoppingCartService';

const getShoppingCartResponse = () => {
  return getShoppingCart().map(({ product, quantity, isSelected }) => ({
    product: product?.getProduct(),
    quantity,
    isSelected,
  }));
};

describe('장바구니 상품 API 테스트', () => {
  test('클라이언트가 GET 요청 시 장바구니 상품 목록을 받아온다.', async () => {
    const productData = {
      name: 'test',
      price: 1000,
      image: 'example/com',
    };
    const products = createProduct(productData);
    const createdProduct = products[products.length - 1].getProduct();

    createShoppingCart(createdProduct.id, 3);

    const response = await request(app).get('/carts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(getShoppingCartResponse());
    expect(response.body).toContainEqual({
      product: { id: createdProduct.id, ...productData },
      quantity: 3,
      isSelected: true,
    });
  });

  test('클라이언트가 PATCH 요청 시 상품 수량을 변경한다', async () => {
    const cartItem = getShoppingCart()[0];
    const id = cartItem.product!.getProduct().id;

    patchShoppingCart(id, 4);

    const response = await request(app)
      .patch(`/carts/${id}`)
      .send({ quantity: 4 });

    expect(response.status).toBe(204);
    expect(
      getShoppingCart().find(({ product }) => product?.getProduct().id === id)
        ?.quantity,
    ).toBe(4);
  });

  test('클라이언트가 PATCH 요청 시 상품 선택 상태를 변경한다', async () => {
    const cartItem = getShoppingCart()[0];
    const id = cartItem.product!.getProduct().id;

    const response = await request(app)
      .patch(`/carts/${id}`)
      .send({ isSelected: false });

    expect(response.status).toBe(204);
    expect(
      getShoppingCart().find(({ product }) => product?.getProduct().id === id)
        ?.isSelected,
    ).toBe(false);
  });

  test('클라이언트가 PATCH 요청 시 모든 상품 선택 상태를 변경한다', async () => {
    const response = await request(app)
      .patch('/carts')
      .send({ isSelected: true });

    expect(response.status).toBe(204);
    expect(getShoppingCart().every(({ isSelected }) => isSelected)).toBe(true);
  });

  test('클라이언트가 DELETE 요청 시 해당 상품을 삭제한다.', async () => {
    const cartItem = getShoppingCart()[0];
    const id = cartItem.product!.getProduct().id;

    const response = await request(app).delete(`/carts/${id}`);

    expect(response.status).toBe(204);
    expect(
      getShoppingCart().map(({ product }) => product?.getProduct().id),
    ).not.toContain(id);
  });
});
