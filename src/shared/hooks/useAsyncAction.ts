'use client'

import { useState } from "react";

function toError(error: unknown) {
  return error instanceof Error ? error : new Error(String(error));
}

export function useAsyncAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const run = async (...args: TArgs) => {
    setIsLoading(true);
    setError(null);

    try {
      return await action(...args);
    } catch (caughtError) {
      const normalizedError = toError(caughtError);
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    run,
    isLoading,
    error,
  };
}
