import { describe, expect, test } from '@jest/globals';

import {
  calculateOrderAmount,
  calculateDeliveryFee,
  calculateTotalAmount,
} from '../../src/entities/cart/calculate';

describe('금액 계산 테스트', () => {
  const data = [
    {
      product: {
        id: '123',
        name: 'A',
        price: 20000,
        image: 'example/com',
      },
      quantity: 2,
    },
    {
      product: {
        id: '124',
        name: 'B',
        price: 35000,
        image: 'example/com',
      },
      quantity: 3,
    },
  ];

  const lowerData = [
    {
      product: {
        id: '123',
        name: 'A',
        price: 20000,
        image: 'example/com',
      },
      quantity: 1,
    },
    {
      product: {
        id: '124',
        name: 'B',
        price: 35000,
        image: 'example/com',
      },
      quantity: 1,
    },
  ];

  test('장바구니에 담긴 상품의 총 주문 금액을 계산한다.', () => {
    const orderAmount = calculateOrderAmount(data);

    expect(orderAmount).toBe(145000);
  });

  test('총 주문 금액이 100,000원 이상이면 배송비는 무료이다.', () => {
    const orderAmount = calculateOrderAmount(data);
    const deliveryFee = calculateDeliveryFee(orderAmount);

    expect(deliveryFee).toBe(0);
  });

  test('총 주문 금액이 100,000원 미만이면 배송비는 유료이다.', () => {
    const orderAmount = calculateOrderAmount(lowerData);
    const deliveryFee = calculateDeliveryFee(orderAmount);

    expect(deliveryFee).toBe(3000);
  });

  test('총 주문 금액과 배송비를 더해 총 결제 금액을 계산한다.', () => {
    const orderAmount = calculateOrderAmount(data);
    const deliveryFee = calculateDeliveryFee(orderAmount);
    const totalAmount = calculateTotalAmount(orderAmount, deliveryFee);

    expect(totalAmount).toBe(145000);
  });

  test('총 주문 금액과 배송비를 더해 총 결제 금액을 계산한다.', () => {
    const orderAmount = calculateOrderAmount(lowerData);
    const deliveryFee = calculateDeliveryFee(orderAmount);
    const totalAmount = calculateTotalAmount(orderAmount, deliveryFee);

    expect(totalAmount).toBe(58000);
  });
});
