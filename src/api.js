const API_BASE = import.meta.env.DEV
  ? "http://localhost:8000/api"
  : "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("auth_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `Error ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── Auth ────────────────────────────────────────────────────
export const authApi = {
  signup: (data) =>
    request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),

  login: (data) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  me: () => request("/auth/me"),
};

// ── Comments ────────────────────────────────────────────────
export const commentsApi = {
  getByBlog: (blogId) => request(`/comments/${blogId}`),

  create: (data) =>
    request("/comments/", { method: "POST", body: JSON.stringify(data) }),

  update: (commentId, data) =>
    request(`/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (commentId) =>
    request(`/comments/${commentId}`, { method: "DELETE" }),
};

// ── Likes ───────────────────────────────────────────────────
export const likesApi = {
  get: (blogId) => request(`/likes/${blogId}`),

  toggle: (blogId) =>
    request(`/likes/${blogId}/toggle`, { method: "POST" }),

  batch: () => request("/likes/batch/counts"),
};

// ── Contact ─────────────────────────────────────────────────
export const contactApi = {
  submit: (data) =>
    request("/contact/", { method: "POST", body: JSON.stringify(data) }),

  getAll: () => request("/contact/"),

  markRead: (id) =>
    request(`/contact/${id}/read`, { method: "PUT" }),

  delete: (id) =>
    request(`/contact/${id}`, { method: "DELETE" }),
};
