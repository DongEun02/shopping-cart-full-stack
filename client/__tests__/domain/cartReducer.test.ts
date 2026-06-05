import { cartReducer } from '../../src/entities/cart/cartReducer';
import type { CartItem } from '../../src/entities/cart/types';

const data: CartItem[] = [
  {
    product: {
      id: 'product-a',
      name: '상품A',
      price: 35000,
      image: null,
    },
    quantity: 2,
    isSelected: true,
  },
  {
    product: {
      id: 'product-b',
      name: '상품B',
      price: 25000,
      image: null,
    },
    quantity: 1,
    isSelected: false,
  },
];

describe('reducer 테스트', () => {
  test('전달한 items로 상태를 교체한다.', () => {
    const result = cartReducer([], { type: 'SET_ITEMS', items: data });

    expect(result).toHaveLength(2);
    expect(result[0].product.id).toBe('product-a');
    expect(result[1].product.id).toBe('product-b');
  });

  test('특정 상품의 선택 상태만 변경한다.', () => {
    const result = cartReducer(data, {
      type: 'CHANGE_ITEM_SELECTION',
      id: 'product-a',
      checked: false,
    });

    expect(result[0].isSelected).toBe(false);
  });

  test('모든 상품의 선택 상태를 변경한다.', () => {
    const result = cartReducer(data, {
      type: 'CHANGE_ALL_SELECTION',
      checked: true,
    });

    expect(result[0].isSelected).toBe(true);
    expect(result[1].isSelected).toBe(true);
  });

  test('특정 상품의 수량을 변경한다.', () => {
    const result = cartReducer(data, {
      type: 'CHANGE_QUANTITY',
      id: 'product-a',
      quantity: 3,
    });

    expect(result[0].quantity).toBe(3);
    expect(result[1].quantity).toBe(1);
  });

  test('특정 상품을 제거한다.', () => {
    const result = cartReducer(data, { type: 'REMOVE_ITEM', id: 'product-a' });

    expect(result).toHaveLength(1);
    expect(result[0].product.id).toBe('product-b');
  });
});
