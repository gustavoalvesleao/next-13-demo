const apiURL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

interface CustomConfig extends RequestInit {
  data?: unknown;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  abortController?: AbortController;
}

async function apiFetch(
  endpoint: string,
  {
    data,
    token,
    method,
    abortController,
    headers: customHeaders,
    ...customConfig
  }: CustomConfig = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    signal: abortController ? abortController.signal : undefined,
    ...customConfig,
  };

  return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    const newData = await response.json();
    if (method === "DELETE") return newData;
    if (response.ok) return newData;
    return Promise.reject(newData);
  });
}

export { apiFetch };
