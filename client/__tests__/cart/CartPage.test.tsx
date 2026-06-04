import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CartPage from '../../src/pages/cart/CartPage';

function renderCartPage() {
  return render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>,
  );
}

describe('CartPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('장바구니 조회 성공 시 상품 목록과 주문 금액을 보여준다.', async () => {
    renderCartPage();

    expect(await screen.findByText('장바구니')).toBeInTheDocument();
    expect(screen.getByText('상품이름A')).toBeInTheDocument();
    expect(screen.getByText('상품이름B')).toBeInTheDocument();
    expect(
      screen.getByText('현재 2종류의 상품이 담겨있습니다.'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('120,000원')).toHaveLength(2);
  });

  test('수량 증가 버튼을 누르면 상품 수량과 주문 금액이 증가한다.', async () => {
    renderCartPage();

    const firstItem = await screen.findByText('상품이름A');
    const firstCartItem = firstItem.closest('li');

    expect(firstCartItem).not.toBeNull();

    fireEvent.click(
      within(firstCartItem as HTMLElement).getByRole('button', { name: '+' }),
    );

    await waitFor(() => {
      expect(
        within(firstCartItem as HTMLElement).getByText('3'),
      ).toBeInTheDocument();
    });
    expect(screen.getAllByText('155,000원')).toHaveLength(2);
  });

  test('상품 삭제 버튼을 누르면 해당 상품이 목록에서 사라진다.', async () => {
    renderCartPage();

    const firstItem = await screen.findByText('상품이름A');
    const firstCartItem = firstItem.closest('li');

    expect(firstCartItem).not.toBeNull();

    fireEvent.click(
      within(firstCartItem as HTMLElement).getByRole('button', {
        name: '삭제',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('상품이름A')).not.toBeInTheDocument();
    });
    expect(screen.getByText('상품이름B')).toBeInTheDocument();
  });
});
