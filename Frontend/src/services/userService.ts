const API_URL = import.meta.env.VITE_USER_API_URL || "http://localhost:5001/api/user";

export type UserProfile = {
  uid: string;
  fullName: string;
  username: string;
  email: string;
  accountType: string;
  bio?: string;
  country?: string;
  language?: string;
  totalMods?: string;
  totalRevenue?: string;
  totalDownloads?: string;
  createdAt: string;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const requestJson = async (url: string, init: RequestInit) => {
  const res = await fetch(url, init);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Server error");
  }
  return data;
};

export async function getProfile(): Promise<{ profile: UserProfile }> {
  return requestJson(`${API_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
}

export async function updateProfile(payload: Partial<UserProfile>): Promise<{ message: string; updates: Partial<UserProfile> }> {
  return requestJson(`${API_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function deleteAccount(payload: { username: string; email: string; fullName: string }): Promise<{ message: string }> {
  return requestJson(`${API_URL}/account`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
}
