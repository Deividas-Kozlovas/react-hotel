import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RegisterLogin from "./pages/registerLoginPage/RegisterLoginPage";
import HomePage from "./pages/home/HomePage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register-login" element={<RegisterLogin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
export default App;
