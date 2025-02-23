import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";

interface RegisterLoginPageProps {
  RegisterLoginForm: React.ComponentType;
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
      <RegisterLoginForm />
    </div>
  );
};

export default RegisterLoginPage;
