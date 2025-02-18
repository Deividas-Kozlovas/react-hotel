import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <button type="submit" disabled={state.loading}>
          {state.loading ? "Registering..." : "Register"}
        </button>
        {state.error && <p>{state.error}</p>}
      </form>
    </div>
  );
};

export default RegisterFormComponent;
