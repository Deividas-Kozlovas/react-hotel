import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import "../formStyling.scss";

interface FormData {
  email: string;
  password: string;
}

const LoginFormComponent = () => {
  const { state, loginUser } = useUserContext();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await loginUser(formData.email, formData.password);
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="auth-form__input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="auth-form__input"
        />
        <button
          type="submit"
          className="auth-form__button"
          disabled={state.loading}
        >
          {state.loading ? "Logging in..." : "Login"}
        </button>
        {state.error && <p className="auth-form__error">{state.error}</p>}
      </form>
    </div>
  );
};

export default LoginFormComponent;
