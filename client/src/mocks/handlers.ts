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
    const body = (await request.json()) as {
      quantity?: number;
      isSelected?: boolean;
    };

    const hasValidQuantity = typeof body.quantity === 'number';
    const hasValidSelection = typeof body.isSelected === 'boolean';

    if (!hasValidQuantity && !hasValidSelection) {
      return HttpResponse.json(
        { message: '변경할 장바구니 상태가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch('/carts', async ({ request }) => {
    const body = (await request.json()) as { isSelected?: boolean };

    if (typeof body.isSelected !== 'boolean') {
      return HttpResponse.json(
        { message: '선택 상태가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/orders', async ({ request }) => {
    const body = (await request.json()) as {
      items?: { productId: string; quantity: number }[];
    };

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json(
        { message: '유효하지 않은 형식입니다.' },
        { status: 400 },
      );
    }

    return HttpResponse.json({ id: 'order-1' }, { status: 201 });
  }),

  http.get('/orders/:id', () => {
    return HttpResponse.json({
      products: [
        {
          productId: 'product-a',
          name: '상품이름A',
          price: 35000,
          image: null,
          quantity: 2,
        },
        {
          productId: 'product-b',
          name: '상품이름B',
          price: 25000,
          image: null,
          quantity: 2,
        },
      ],
      isRemoteArea: false,
      amount: {
        orderAmount: 120000,
        discountAmount: 5000,
        shippingFee: 0,
        totalAmount: 115000,
      },
    });
  }),

  http.delete('/carts/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
