import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import CartPage from '../../src/pages/cart/CartPage';
import { server } from '../../src/mocks/server';

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

  test('장바구니 조회 중에는 로딩 스피너를 보여준다.', () => {
    server.use(
      http.get('/carts', async () => {
        await delay(100);

        return HttpResponse.json([]);
      }),
    );

    renderCartPage();

    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  test('장바구니 조회 실패 시 에러 메시지를 보여준다.', async () => {
    server.use(
      http.get('/carts', () => {
        return HttpResponse.json(
          { message: '장바구니 조회 실패' },
          { status: 500 },
        );
      }),
    );

    renderCartPage();

    expect(
      await screen.findByText('장바구니 목록을 불러오지 못했습니다.'),
    ).toBeInTheDocument();
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

  test('선택된 상품이 없으면 주문 확인 버튼이 비활성화된다.', async () => {
    renderCartPage();

    const selectAllCheckbox = await screen.findByRole('checkbox', {
      name: '전체선택',
    });

    fireEvent.click(selectAllCheckbox);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '주문 확인' })).toBeDisabled();
    });
  });

  test('선택된 상품이 있으면 주문 확인 버튼이 활성화된다.', async () => {
    renderCartPage();

    const selectAllCheckbox = await screen.findByRole('checkbox', {
      name: '전체선택',
    });
    fireEvent.click(selectAllCheckbox);

    const firstItem = await screen.findByText('상품이름A');
    const firstCartItem = firstItem.closest('li');

    fireEvent.click(within(firstCartItem as HTMLElement).getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '주문 확인' })).toBeEnabled();
    });
  });
});
