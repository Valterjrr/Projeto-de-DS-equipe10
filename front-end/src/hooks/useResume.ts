import { useCallback, useMemo, useRef, useState } from "react";
import { api } from "../services/api";
import type { CVRequest, CVResponse } from "../types/resume";

export function useResumeApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const analyze = useCallback(async (payload: CVRequest) => {
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const data = await api.post<CVResponse>("api/v1/generate-cv", payload, {
        signal: controller.signal,
      });
      return data;
    } catch (e: any) {
      if (e?.name === "AbortError") return undefined;
      setError(e?.message || "Erro ao analisar currículo");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(
    () => ({ loading, error, analyze, abort }),
    [loading, error, analyze, abort]
  );
}
