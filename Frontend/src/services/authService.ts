const API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:5001/api/auth";

type SignUpPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  accountType: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

const requestJson = async (url: string, init: RequestInit) => {
  const res = await fetch(url, init);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Server error");
  }
  return data;
};

export async function signUp(payload: SignUpPayload) {
  return requestJson(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function signIn(payload: SignInPayload) {
  return requestJson(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
