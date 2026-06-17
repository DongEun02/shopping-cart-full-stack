import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { getAllProducts } from '../../src/service/productService';
import {
  createOrder,
  getOrder,
  getOrderCoupons,
  selectOrderCoupons,
  updateOrderRemoteArea,
} from '../../src/service/orderService';

function setCurrentTime(hour: number, day = 17) {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 5, day, hour));
}

describe('주문 서비스 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('주문 생성 시 최적 쿠폰 조합과 할인 금액을 주문서에 반영한다.', () => {
    setCurrentTime(5);

    const product = getAllProducts()[0].getProduct();
    const { id } = createOrder([{ productId: product.id, quantity: 3 }]);

    const order = getOrder(id);
    const orderCoupons = getOrderCoupons(id);

    expect(order.amount.orderAmount).toBe(105000);
    expect(order.amount.discountAmount).toBe(56000);
    expect(order.amount.totalAmount).toBe(49000);
    expect(
      orderCoupons
        .filter(({ isSelected }) => isSelected)
        .map(({ code }) => code),
    ).toEqual(['BOGO', 'MIRACLESALE']);
  });

  test('사용자가 쿠폰을 변경하면 선택 쿠폰과 할인 금액을 주문서에 다시 반영한다.', () => {
    setCurrentTime(5);

    const product = getAllProducts()[0].getProduct();
    const { id } = createOrder([{ productId: product.id, quantity: 3 }]);

    const order = selectOrderCoupons(id, ['FIXED5000']);
    const orderCoupons = getOrderCoupons(id);

    expect(order.amount.discountAmount).toBe(5000);
    expect(order.amount.totalAmount).toBe(100000);
    expect(
      orderCoupons
        .filter(({ isSelected }) => isSelected)
        .map(({ code }) => code),
    ).toEqual(['FIXED5000']);
  });

  test('도서 산간 여부를 변경하면 현재 선택된 쿠폰 기준으로 할인 금액을 다시 계산한다.', () => {
    setCurrentTime(5);

    const product = getAllProducts()[1].getProduct();
    const { id } = createOrder([{ productId: product.id, quantity: 2 }]);

    const order = updateOrderRemoteArea(id, true);
    const orderCoupons = getOrderCoupons(id);

    expect(order.isRemoteArea).toBe(true);
    expect(order.amount.shippingFee).toBe(6000);
    expect(order.amount.discountAmount).toBe(21000);
    expect(order.amount.totalAmount).toBe(35000);
    expect(
      orderCoupons
        .filter(({ isSelected }) => isSelected)
        .map(({ code }) => code),
    ).toEqual(['FREESHIPPING', 'MIRACLESALE']);
  });

  test('2+1 조건을 만족하지 않는 쿠폰은 비활성화한다.', () => {
    setCurrentTime(8);

    const product = getAllProducts()[0].getProduct();
    const { id } = createOrder([{ productId: product.id, quantity: 2 }]);

    const bogoCoupon = getOrderCoupons(id).find(({ code }) => code === 'BOGO');

    expect(bogoCoupon?.isDisabled).toBe(true);
  });

  test('만료일이 지난 쿠폰은 비활성화한다.', () => {
    setCurrentTime(5, 31);

    const product = getAllProducts()[0].getProduct();
    const { id } = createOrder([{ productId: product.id, quantity: 3 }]);

    const bogoCoupon = getOrderCoupons(id).find(({ code }) => code === 'BOGO');

    expect(bogoCoupon?.isDisabled).toBe(true);
  });
});
