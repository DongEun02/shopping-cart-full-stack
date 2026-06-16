import { describe, expect, test } from '@jest/globals';
import Order from '../../src/domain/Order';

describe('주문서 도메인 테스트', () => {
  const data = {
    productId: '1',
    name: '나이키',
    price: 25000,
    image: 'example/com',
    quantity: 2,
  };

  const order = new Order(data);

  test('상품을 받아 결제 금액을 계산한다.', () => {
    const orderData = order.getOrder();

    expect(orderData.amount.orderAmount).toBe(50000);
  });
});
