import AuthService from "../services/AuthService";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(userEmail, pwd);
      const token = response.token;
      localStorage.setItem("token", token);
      AuthService.setTokenInHeaders(token);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleLogin}>
        <div class="mb-6">
           <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 m-4">
          Dont have an account ?{" "}
          <a href="" class="text-blue-700 hover:underline dark:text-blue-500">
            <Link to="/registration">Sign Up</Link>
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
