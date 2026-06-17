import { describe, expect, test } from '@jest/globals';
import {
  calculateBogoDiscount,
  calculateFixedAmountDiscount,
  calculateFreeShippingDiscount,
  calculatePercentageDiscount,
} from '../../src/domain/couponCalculator';
import type {
  BogoCoupon,
  FixedAmountCoupon,
  FreeShippingCoupon,
  OrderData,
  OrderProduct,
  PercentageCoupon,
} from '../../src/types/type';

const fixed5000Coupon: FixedAmountCoupon = {
  code: 'FIXED5000',
  name: '5,000원 할인 쿠폰',
  expiresAt: '2026-11-30',
  minOrderAmount: 100000,
  discountAmount: 5000,
};

const bogoCoupon: BogoCoupon = {
  code: 'BOGO',
  name: '2개 구매 시 1개 무료 쿠폰',
  expiresAt: '2026-06-30',
  minCount: 3,
  freeCount: 1,
};

const freeShippingCoupon: FreeShippingCoupon = {
  code: 'FREESHIPPING',
  name: '5만원 이상 구매 시 무료 배송 쿠폰',
  expiresAt: '2026-08-31',
  minOrderAmount: 50000,
  discountAmount: 3000,
  remoteAreaFee: 3000,
};

const percentageCoupon: PercentageCoupon = {
  code: 'MIRACLESALE',
  name: '미라클모닝 30% 할인 쿠폰',
  expiresAt: '2026-07-31',
  discountRate: 30,
  startTime: '04:00',
  endTime: '07:00',
};

const createDateAt = (time: string) => {
  return new Date(`2026-06-17T${time}:00`);
};

const calculateShippingFee = (orderAmount: number, isRemoteArea: boolean) => {
  const baseShippingFee = orderAmount >= 100000 ? 0 : 3000;

  return baseShippingFee + (isRemoteArea ? 3000 : 0);
};

const createOrder = (
  products: OrderProduct[],
  isRemoteArea = false,
): OrderData => {
  const orderAmount = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return {
    id: 'order-id',
    products,
    isRemoteArea,
    amount: {
      orderAmount,
      discountAmount: 0,
      shippingFee: calculateShippingFee(orderAmount, isRemoteArea),
      totalAmount:
        orderAmount + calculateShippingFee(orderAmount, isRemoteArea),
    },
  };
};

const createSingleProductOrder = (
  orderAmount: number,
  isRemoteArea = false,
): OrderData => ({
  id: 'order-id',
  products: [
    {
      productId: 'product-id',
      name: '상품',
      price: orderAmount,
      image: 'example/com',
      quantity: 1,
    },
  ],
  isRemoteArea,
  amount: {
    orderAmount,
    discountAmount: 0,
    shippingFee: calculateShippingFee(orderAmount, isRemoteArea),
    totalAmount: orderAmount + calculateShippingFee(orderAmount, isRemoteArea),
  },
});

describe('FIXED5000 쿠폰', () => {
  test('주문 금액이 최소 주문 금액 이상이면 고정 금액을 할인한다.', () => {
    const order = createSingleProductOrder(120000);

    const discountAmount = calculateFixedAmountDiscount(order, fixed5000Coupon);

    expect(discountAmount).toBe(5000);
  });

  test('주문 금액이 최소 주문 금액 미만이면 할인하지 않는다.', () => {
    const order = createSingleProductOrder(99999);

    const discountAmount = calculateFixedAmountDiscount(order, fixed5000Coupon);

    expect(discountAmount).toBe(0);
  });

  test('주문 금액이 최소 주문 금액과 같으면 고정 금액을 할인한다.', () => {
    const order = createSingleProductOrder(100000);

    const discountAmount = calculateFixedAmountDiscount(order, fixed5000Coupon);

    expect(discountAmount).toBe(5000);
  });
});

describe('BOGO 쿠폰', () => {
  test('같은 상품 수량이 최소 수량 이상이면 해당 상품 1개 금액을 할인한다.', () => {
    const order = createOrder([
      {
        productId: 'product-id',
        name: '상품',
        price: 10000,
        image: 'example/com',
        quantity: 3,
      },
    ]);

    const discountAmount = calculateBogoDiscount(order, bogoCoupon);

    expect(discountAmount).toBe(10000);
  });

  test('같은 상품 수량이 최소 수량 미만이면 할인하지 않는다.', () => {
    const order = createOrder([
      {
        productId: 'product-id',
        name: '상품',
        price: 10000,
        image: 'example/com',
        quantity: 2,
      },
    ]);

    const discountAmount = calculateBogoDiscount(order, bogoCoupon);

    expect(discountAmount).toBe(0);
  });

  test('같은 상품 수량이 최소 수량을 초과해도 상품 1개 금액만 할인한다.', () => {
    const order = createOrder([
      {
        productId: 'product-id',
        name: '상품',
        price: 10000,
        image: 'example/com',
        quantity: 6,
      },
    ]);

    const discountAmount = calculateBogoDiscount(order, bogoCoupon);

    expect(discountAmount).toBe(10000);
  });

  test('조건을 만족하는 상품이 여러 개면 가장 비싼 상품 1개 금액을 할인한다.', () => {
    const order = createOrder([
      {
        productId: 'product-a',
        name: '상품 A',
        price: 10000,
        image: 'example/a',
        quantity: 3,
      },
      {
        productId: 'product-b',
        name: '상품 B',
        price: 30000,
        image: 'example/b',
        quantity: 3,
      },
    ]);

    const discountAmount = calculateBogoDiscount(order, bogoCoupon);

    expect(discountAmount).toBe(30000);
  });
});

describe('FREESHIPPING 쿠폰', () => {
  test('주문 금액이 최소 주문 금액 이상이면 실제 배송비를 할인한다.', () => {
    const order = createSingleProductOrder(50000);

    const discountAmount = calculateFreeShippingDiscount(
      order,
      freeShippingCoupon,
    );

    expect(discountAmount).toBe(3000);
  });

  test('주문 금액이 최소 주문 금액 미만이면 할인하지 않는다.', () => {
    const order = createSingleProductOrder(49999);

    const discountAmount = calculateFreeShippingDiscount(
      order,
      freeShippingCoupon,
    );

    expect(discountAmount).toBe(0);
  });

  test('도서 산간 지역이면 추가 배송비까지 할인한다.', () => {
    const order = createSingleProductOrder(50000, true);

    const discountAmount = calculateFreeShippingDiscount(
      order,
      freeShippingCoupon,
    );

    expect(discountAmount).toBe(6000);
  });

  test('기본 배송비가 무료여도 도서 산간 추가 배송비는 할인한다.', () => {
    const order = createSingleProductOrder(100000, true);

    const discountAmount = calculateFreeShippingDiscount(
      order,
      freeShippingCoupon,
    );

    expect(discountAmount).toBe(3000);
  });
});

describe('MIRACLESALE 쿠폰', () => {
  test('사용 가능 시간에 주문 금액의 할인율만큼 할인한다.', () => {
    const order = createSingleProductOrder(100000);

    const discountAmount = calculatePercentageDiscount(
      order,
      percentageCoupon,
      createDateAt('05:00'),
    );

    expect(discountAmount).toBe(30000);
  });

  test('할인 금액에 소수점이 있으면 원 단위로 내림한다.', () => {
    const order = createSingleProductOrder(99999);

    const discountAmount = calculatePercentageDiscount(
      order,
      percentageCoupon,
      createDateAt('05:00'),
    );

    expect(discountAmount).toBe(29999);
  });

  test('시작 시간에는 할인한다.', () => {
    const order = createSingleProductOrder(100000);

    const discountAmount = calculatePercentageDiscount(
      order,
      percentageCoupon,
      createDateAt('04:00'),
    );

    expect(discountAmount).toBe(30000);
  });

  test('종료 시간에는 할인하지 않는다.', () => {
    const order = createSingleProductOrder(100000);

    const discountAmount = calculatePercentageDiscount(
      order,
      percentageCoupon,
      createDateAt('07:00'),
    );

    expect(discountAmount).toBe(0);
  });

  test('사용 가능 시간 전에는 할인하지 않는다.', () => {
    const order = createSingleProductOrder(100000);

    const discountAmount = calculatePercentageDiscount(
      order,
      percentageCoupon,
      createDateAt('03:59'),
    );

    expect(discountAmount).toBe(0);
  });
});
