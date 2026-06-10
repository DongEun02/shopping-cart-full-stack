import { render, screen } from '@testing-library/react';

import { setQueryData, useQuery } from '../../src/shared/hooks/useQuery';

type TestQueryProps = {
  queryKey: string;
  queryFn: () => Promise<string>;
};

function TestQuery({ queryKey, queryFn }: TestQueryProps) {
  const { data, isLoading, error } = useQuery(queryKey, queryFn);

  if (isLoading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  return <p>{data}</p>;
}

describe('useQuery', () => {
  test('같은 queryKey로 다시 마운트하면 캐시된 데이터를 사용하고 재요청하지 않는다.', async () => {
    const queryFn = jest.fn().mockResolvedValue('first data');

    const { unmount } = render(
      <TestQuery queryKey="testQuery" queryFn={queryFn} />,
    );

    expect(await screen.findByText('first data')).toBeInTheDocument();
    expect(queryFn).toHaveBeenCalledTimes(1);

    unmount();

    render(<TestQuery queryKey="testQuery" queryFn={queryFn} />);

    expect(screen.getByText('first data')).toBeInTheDocument();
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  test('queryKey가 바뀌면 새 데이터를 요청한다.', async () => {
    const queryFn = jest
      .fn()
      .mockResolvedValueOnce('first data')
      .mockResolvedValueOnce('second data');

    const { rerender } = render(
      <TestQuery queryKey="firstQuery" queryFn={queryFn} />,
    );

    expect(await screen.findByText('first data')).toBeInTheDocument();

    rerender(<TestQuery queryKey="secondQuery" queryFn={queryFn} />);

    expect(await screen.findByText('second data')).toBeInTheDocument();
    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  test('setQueryData로 캐시 데이터를 갱신한다.', async () => {
    const queryFn = jest.fn().mockResolvedValue('old data');

    const { unmount } = render(
      <TestQuery queryKey="testQuery" queryFn={queryFn} />,
    );

    expect(await screen.findByText('old data')).toBeInTheDocument();

    setQueryData<string>('testQuery', () => 'new data');
    unmount();

    render(<TestQuery queryKey="testQuery" queryFn={queryFn} />);

    expect(screen.getByText('new data')).toBeInTheDocument();
    expect(queryFn).toHaveBeenCalledTimes(1);
  });
});
