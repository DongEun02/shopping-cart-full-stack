import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { saveSelectedCartItemIds } from '../../src/entities/cart/storage';
import CartPage from '../../src/pages/cart/CartPage';

function renderCartPage() {
  return render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>,
  );
}

describe('localStorage 상태 복원', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('페이지 새로고침 시 localStorage에 저장된 상품만 선택 상태로 복원한다.', async () => {
    saveSelectedCartItemIds(['product-b']);

    renderCartPage();

    const firstItem = await screen.findByText('상품이름A');
    const secondItem = screen.getByText('상품이름B');
    const firstCartItem = firstItem.closest('li');
    const secondCartItem = secondItem.closest('li');

    expect(firstCartItem).not.toBeNull();
    expect(secondCartItem).not.toBeNull();

    expect(
      within(firstCartItem as HTMLElement).getByRole('checkbox'),
    ).not.toBeChecked();
    expect(
      within(secondCartItem as HTMLElement).getByRole('checkbox'),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '전체선택' }),
    ).not.toBeChecked();
    expect(screen.getByText('50,000원')).toBeInTheDocument();
    expect(screen.getByText('53,000원')).toBeInTheDocument();
  });

  test('페이지 새로고침 시 저장된 상품 id가 없으면 모든 상품을 선택 상태로 보여준다.', async () => {
    renderCartPage();

    const firstItem = await screen.findByText('상품이름A');
    const secondItem = screen.getByText('상품이름B');
    const firstCartItem = firstItem.closest('li');
    const secondCartItem = secondItem.closest('li');

    expect(firstCartItem).not.toBeNull();
    expect(secondCartItem).not.toBeNull();

    expect(
      within(firstCartItem as HTMLElement).getByRole('checkbox'),
    ).toBeChecked();
    expect(
      within(secondCartItem as HTMLElement).getByRole('checkbox'),
    ).toBeChecked();
    expect(screen.getByRole('checkbox', { name: '전체선택' })).toBeChecked();
    expect(screen.getAllByText('120,000원')).toHaveLength(2);
  });
});
