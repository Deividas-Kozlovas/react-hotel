import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import "./App.css";
import RegisterFormComponent from "./components/forms/registerFormComponent/RegisterFormComponent";
import LoginFormComponent from "./components/forms/loginFormComponent/LoginFormComponent";
import HomePage from "./pages/home/HomePage";
import { UserProvider } from "./context/UserContext";
import RegisterLoginPage from "./pages/RegisterLogin/RegisterLoginPage";
import NavigationComponent from "./components/navigation/NavigationComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { RoomProvider } from "./context/RoomContext";
import IndividualRoomComponent from "./components/individualRoom/individualRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";

const App = () => {
  return (
    <UserProvider>
      <RoomProvider>
        <Router>
          <NavigationWithVisibility />
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
            <Route path="/room/:id" element={<IndividualRoomComponent />} />
            <Route path="/create-room" element={<CreateRoom />} />
          </Routes>
        </Router>
      </RoomProvider>
    </UserProvider>
  );
};

const NavigationWithVisibility = () => {
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/register" || location.pathname === "/login";

  return <>{!shouldHideNavbar && <NavigationComponent />}</>;
};

export default App;
