import io from "socket.io-client";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/Registration";
import HomePage from "./pages/HomePage";
import TaskDetails from "./components/Task/TaskDetails";
import AuthService from "../src/components/services/AuthService";
import RequireAuth from "./components/services/RequireAuth";
function App() {
  const isLoggedIn = AuthService.isLoggedIn();

  const socket = io("http://localhost:4000");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
