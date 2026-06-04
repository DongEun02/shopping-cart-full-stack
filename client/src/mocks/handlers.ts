import { http, HttpResponse } from 'msw';

import type { CartItem } from '../entities/cart/types';

export const mockCartItems: CartItem[] = [
  {
    product: {
      id: 'product-a',
      name: '상품이름A',
      price: 35000,
      image: null,
    },
    quantity: 2,
    isSelected: true,
  },
  {
    product: {
      id: 'product-b',
      name: '상품이름B',
      price: 25000,
      image: null,
    },
    quantity: 2,
    isSelected: true,
  },
];

export const handlers = [
  http.get('/carts', () => {
    return HttpResponse.json(mockCartItems);
  }),

  http.patch('/carts/:id', async ({ request }) => {
    const body = (await request.json()) as { quantity: number };

    if (typeof body.quantity !== 'number') {
      return HttpResponse.json(
        { message: '상품 수량은 숫자여야 합니다.' },
        { status: 400 },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.delete('/carts/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
