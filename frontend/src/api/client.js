const API_BASE = 'http://localhost:8080';

export const apiClient = async (
    endpoint,
    { method = 'GET', body, token } = {}
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // safe even if unused
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);

  }

  return res.json();
};
