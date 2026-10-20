import { useCallback, useState } from "react";

interface UseApiRequestOptions<T> {
  url: string;
  method?: "POST" | "PUT" | "PATCH";
  beforeRequest?: () => void;
  finishRequest?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export const useApiRequest = <T = unknown>() => {
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (json: Record<string, unknown>, options: UseApiRequestOptions<T>) => {
      const {
        url,
        method = "POST",
        beforeRequest,
        finishRequest,
        onSuccess,
        onError,
      } = options;

      try {
        beforeRequest?.();
        setLoading(true);

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        });

        const data: T = await response.json();

        if (!response.ok) {
          throw data;
        }

        onSuccess?.(data);
      } catch (error: unknown) {
        onError?.(error);
      } finally {
        finishRequest?.();
        setLoading(false);
      }
    },
    []
  );

  return { sendRequest, loading };
};
