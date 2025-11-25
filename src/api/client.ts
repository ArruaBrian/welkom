export const API_BASE_URL = "https://api.welkomia.com/api";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  console.log("[API] request:", url, init);
  const res = await fetch(url, {
    ...init,
    headers: { ...jsonHeaders, ...(init.headers || {}) },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("[API] error:", url, res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }
  const raw = await res.text();
  if (!raw) {
    console.log("[API] response empty:", url);
    return undefined as T;
  }
  const data = JSON.parse(raw) as T;
  console.log("[API] response:", url, data);
  return data;
}
