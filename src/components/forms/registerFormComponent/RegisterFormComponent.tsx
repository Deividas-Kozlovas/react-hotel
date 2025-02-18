import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import "../formStyling.scss";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const RegisterFormComponent = () => {
  const { state, userRegister } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
    await userRegister(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirm
    );
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="auth-form__input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="auth-form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="auth-form__input"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className="auth-form__input"
        />
        <button
          type="submit"
          className="auth-form__button"
          disabled={state.loading}
        >
          {state.loading ? "Registering..." : "Register"}
        </button>
        <Link className="auth-form__switch" to="/login">
          login
        </Link>
        {state.error && <p className="auth-form__error">{state.error}</p>}
        {state.loading && <ClipLoader size={50} color="#007bff" />}
      </form>
    </div>
  );
};

export default RegisterFormComponent;
