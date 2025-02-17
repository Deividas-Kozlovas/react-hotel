export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/api/v1/user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
