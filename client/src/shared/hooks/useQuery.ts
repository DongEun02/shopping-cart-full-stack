import { useEffect, useEffectEvent, useState } from 'react';

const cache = new Map<string, unknown>();

type UseQueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

type QueryState<T> = UseQueryResult<T> & {
  queryKey: string;
};

export function useQuery<T>(
  queryKey: string,
  queryFn: () => Promise<T>,
): UseQueryResult<T> {
  const hasCachedData = cache.has(queryKey);
  const cachedData = cache.get(queryKey) as T | undefined;

  const [state, setState] = useState<QueryState<T>>({
    queryKey,
    data: cachedData ?? null,
    isLoading: !hasCachedData,
    error: null,
  });

  const executeQuery = useEffectEvent(async () => {
    return queryFn();
  });

  useEffect(() => {
    let ignore = false;

    if (cache.has(queryKey)) {
      return;
    }

    executeQuery()
      .then((response) => {
        if (ignore) return;

        cache.set(queryKey, response);
        setState({
          queryKey,
          data: response,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (ignore) return;

        setState({
          queryKey,
          data: null,
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error('알 수 없는 에러가 발생했습니다.'),
        });
      });

    return () => {
      ignore = true;
    };
  }, [queryKey]);

  if (hasCachedData) {
    return {
      data: cachedData ?? null,
      isLoading: false,
      error: null,
    };
  }

  if (state.queryKey !== queryKey) {
    return {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
  };
}

export function setQueryData<T>(queryKey: string, updateFn: (data: T) => T) {
  const cachedData = cache.get(queryKey) as T | undefined;
  if (!cachedData) return;

  cache.set(queryKey, updateFn(cachedData));
}
