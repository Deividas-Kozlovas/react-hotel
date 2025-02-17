import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const LoginFormComponent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { state, loginUser } = useUserContext();

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await loginUser(formData.email, formData.password);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" disabled={state.loading}>
          {state.loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {state.error && <p>{state.error}</p>}
    </div>
  );
};

export default LoginFormComponent;
