const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (!BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn("VITE_API_BASE_URL is not defined. API calls will fail.");
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL || ""}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as T) : (undefined as unknown as T);
  if (!res.ok) {
    const msg = (data as any)?.message || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { method: "GET", ...init }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...init,
    }),
};

export type {};
