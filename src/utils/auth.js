const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Save the token if the backend says success
    if (data.message === "Logged in successfully") {
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login fetch error:", error);
    return { message: "Network Error: Is the backend running on port 5000?" };
  }
};

export const register = async (form) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    return await response.json();
  } catch (error) {
    console.error("Registration fetch error:", error);
    return { message: "Registration failed. Server unreachable." };
  }
};