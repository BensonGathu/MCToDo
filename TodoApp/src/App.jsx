import io from "socket.io-client";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/Registration";
import HomePage from "./pages/HomePage";
function App() {
  const socket = io("http://localhost:4000");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />

          <Route path="/" element={<HomePage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
