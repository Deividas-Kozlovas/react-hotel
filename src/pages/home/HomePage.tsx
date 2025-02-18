import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const HomePage = () => {
  const { state } = useUserContext();

  return state.token ? (
    <div>
      <div>homepage</div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default HomePage;
