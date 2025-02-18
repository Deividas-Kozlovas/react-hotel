import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RegisterFormComponent from "./components/forms/registerFormComponent/RegisterFormComponent";
import LoginFormComponent from "./components/forms/loginFormComponent/LoginFormComponent";
import HomePage from "./pages/home/HomePage";
import { UserProvider } from "./context/UserContext";
import RegisterLoginPage from "./pages/RegisterLogin/RegisterLoginPage"; // Ensure this path is correct

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RegisterLoginPage RegisterLoginForm={RegisterFormComponent} />
            }
          />
          <Route
            path="/login"
            element={
              <RegisterLoginPage RegisterLoginForm={LoginFormComponent} />
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
