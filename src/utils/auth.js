const API = 'http://localhost:5000/api/auth';

export const register = async (formData) => {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(formData)
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  return res.json();
};