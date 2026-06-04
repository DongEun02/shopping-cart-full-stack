import type { CartItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchCartItems(): Promise<CartItem[]> {
  const response = await fetch(`${API_BASE_URL}/carts`);

  if (!response.ok) {
    throw new Error('장바구니 목록을 불러오지 못했습니다.');
  }

  return response.json();
}

export async function updateCartItemQuantity(id: string, quantity: number) {
  const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('상품 수량을 변경하지 못했습니다.');
  }
}

export async function deleteCartItem(id: string) {
  const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('상품을 삭제하지 못했습니다.');
  }
}
