import { API_BASE_URL } from '../../../shared/config/env';

export type CreateOrderItem = {
  productId: string;
  quantity: number;
};

type CreateOrderResponse = {
  id: string;
};

export async function createOrder(
  items: CreateOrderItem[],
): Promise<CreateOrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error('주문을 생성하지 못했습니다.');
  }

  return response.json();
}
