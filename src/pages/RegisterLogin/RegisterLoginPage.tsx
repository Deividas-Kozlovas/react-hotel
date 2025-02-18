import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";

// Define the type for RegisterLoginForm as a React component
interface RegisterLoginPageProps {
  RegisterLoginForm: React.ComponentType; // Or React.FC for functional components
}

const RegisterLoginPage = ({ RegisterLoginForm }: RegisterLoginPageProps) => {
  const { state } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.token) {
      navigate("/");
    }
  }, [state.token, navigate]);

  return (
    <div>
      <RegisterLoginForm /> {/* This will render RegisterFormComponent */}
    </div>
  );
};

export default RegisterLoginPage;
