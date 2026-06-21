import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import OrderPage from '../../src/pages/Order/OrderPage';
import { server } from '../../src/mocks/server';

function renderOrderPage() {
  return render(
    <MemoryRouter initialEntries={['/order/order-1']}>
      <Routes>
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('OrderPage', () => {
  test('주문서 조회 중에는 로딩 스피너를 보여준다.', () => {
    server.use(
      http.get('/orders/:id', async () => {
        await delay(100);

        return HttpResponse.json(null);
      }),
    );

    renderOrderPage();

    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  test('주문서 조회 성공 시 주문 상품과 결제 금액을 보여준다.', async () => {
    renderOrderPage();

    expect(await screen.findByText('상품이름A')).toBeInTheDocument();
    expect(screen.getByText('상품이름B')).toBeInTheDocument();
    expect(
      screen.getByText(/총 2종류의 상품 4개를 주문합니다./),
    ).toBeInTheDocument();
    expect(screen.getByText('120,000원')).toBeInTheDocument();
    expect(screen.getByText('-5,000원')).toBeInTheDocument();
    expect(screen.getByText('115,000원')).toBeInTheDocument();
  });

  test('주문서 조회 실패 시 에러 메시지를 보여준다.', async () => {
    server.use(
      http.get('/orders/:id', () => {
        return HttpResponse.json(null, { status: 404 });
      }),
    );

    renderOrderPage();

    expect(
      await screen.findByText('주문서를 불러오지 못했습니다.'),
    ).toBeInTheDocument();
  });

  test('도서 산간 지역을 선택하면 배송 정보를 수정하고 주문서를 다시 조회한다.', async () => {
    let isRemoteArea = false;
    let requestBody: unknown;

    server.use(
      http.get('/orders/:id', () => {
        return HttpResponse.json({
          products: [
            {
              productId: 'product-a',
              name: '상품이름A',
              price: 35000,
              image: null,
              quantity: 2,
            },
          ],
          isRemoteArea,
          amount: {
            orderAmount: 70000,
            discountAmount: isRemoteArea ? 6000 : 3000,
            shippingFee: isRemoteArea ? 6000 : 3000,
            totalAmount: 70000,
          },
        });
      }),
      http.patch('/orders/:id', async ({ request }) => {
        requestBody = await request.json();
        isRemoteArea = true;

        return new HttpResponse(null, { status: 204 });
      }),
    );

    renderOrderPage();

    const checkbox = await screen.findByRole('checkbox', {
      name: '제주도 및 도서 산간 지역',
    });

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(requestBody).toEqual({ isRemoteArea: true });
      expect(checkbox).toBeChecked();
      expect(screen.getByText('-6,000원')).toBeInTheDocument();
      expect(screen.getByText('6,000원')).toBeInTheDocument();
    });
  });

  test('배송 정보 수정 실패 시 기존 주문서를 유지한다.', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    try {
      server.use(
        http.patch('/orders/:id', () => {
          return HttpResponse.json(null, { status: 500 });
        }),
      );

      renderOrderPage();

      const checkbox = await screen.findByRole('checkbox', {
        name: '제주도 및 도서 산간 지역',
      });

      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          '배송 정보를 변경하지 못했습니다.',
        );
        expect(checkbox).not.toBeChecked();
      });
    } finally {
      alertSpy.mockRestore();
    }
  });
});
