import api from "../utils/api";

//  Service class for handling user authentication-related actions.
 

class AuthService {
  //  register a user with the provided information.
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

  //  Attempt to log in a user with the provided email and password.
  async login(email, password) {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Log out the user by removing the authentication token from local storage.
  async logout(token) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    try {
      const response = await api.post("/api/auth/logout", { token });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  //  Set the user's authentication token in the request headers for API requests.
  setTokenInHeaders(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }


  //  Clear the user's authentication token from the request headers for API requests.
  clearTokenFromHeaders() {
    delete api.defaults.headers.common["Authorization"];
  }

  // Check if a user is logged in by verifying the presence of a token in local storage.
  isLoggedIn() {
    const token = localStorage.getItem("token");

    return !!token;
  }

  userInfo(){
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");

    return { username, userID };
  }
}

export default new AuthService();
