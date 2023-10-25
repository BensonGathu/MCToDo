import api from "../utils/api";

class AuthService {
  async register(first_name, last_name, email, password) {
    try {
      const response = await api.post("/api/auth/register", {
        first_name,
        last_name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async login(email, password) {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async logout(token) {
    localStorage.removeItem("token");
    try {
      const response = await api.post("/api/auth/logout", { token });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  setTokenInHeaders(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearTokenFromHeaders() {
    delete api.defaults.headers.common["Authorization"];
  }
  isLoggedIn() {
    const token = localStorage.getItem("token");

    return !!token;
  }
}

export default new AuthService();
