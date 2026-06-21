import {
  initialOrderState,
  orderReducer,
} from '../../src/entities/order/orderReducer';

const order = {
  products: [],
  isRemoteArea: false,
  amount: {
    orderAmount: 100000,
    discountAmount: 5000,
    shippingFee: 0,
    totalAmount: 95000,
  },
};

describe('orderReducer', () => {
  test('주문서를 저장한다.', () => {
    const state = orderReducer(initialOrderState, {
      type: 'SET_ORDER',
      order,
    });

    expect(state.order).toEqual(order);
    expect(state.couponDiscountAmount).toBe(5000);
  });

  test('쿠폰 목록의 선택 상태를 초기 선택 코드로 저장한다.', () => {
    const coupons = [
      {
        id: 'FIXED5000' as const,
        isSelected: true,
        isDisabled: false,
        name: '5,000원 할인 쿠폰',
        dueDate: '2026-11-30',
      },
      {
        id: 'BOGO' as const,
        isSelected: false,
        isDisabled: false,
        name: '2개 구매 시 1개 무료 쿠폰',
        dueDate: '2026-06-30',
      },
    ];

    const state = orderReducer(initialOrderState, {
      type: 'SET_COUPONS',
      coupons,
    });

    expect(state.coupons).toEqual(coupons);
    expect(state.selectedCouponCodes).toEqual(['FIXED5000']);
  });

  test('쿠폰 할인 계산 결과를 저장한다.', () => {
    const state = orderReducer(initialOrderState, {
      type: 'SET_COUPON_SELECTION',
      couponCodes: ['FIXED5000', 'FREESHIPPING'],
      discountAmount: 8000,
    });

    expect(state.selectedCouponCodes).toEqual([
      'FIXED5000',
      'FREESHIPPING',
    ]);
    expect(state.couponDiscountAmount).toBe(8000);
  });
});
