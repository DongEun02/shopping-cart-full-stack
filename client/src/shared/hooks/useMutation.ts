import { useCallback, useState } from 'react';

type UseMutationResult = {
  mutate: (mutationFn: () => Promise<void>) => Promise<void>;
  isMutationLoading: boolean;
  error: Error | null;
};

export function useMutation(): UseMutationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (mutationFn: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);

    try {
      await mutationFn();
    } catch (error) {
      const mutationError =
        error instanceof Error
          ? error
          : new Error('알 수 없는 에러가 발생했습니다.');

      setError(mutationError);
      throw mutationError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    mutate,
    isMutationLoading: isLoading,
    error,
  };
}
