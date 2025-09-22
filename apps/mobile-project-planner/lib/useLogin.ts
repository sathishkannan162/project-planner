import { authClient } from "./auth-client";
import { useState } from "react";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await authClient.signIn.email({
        email,
        password,
      });
      console.log(data, 'data');
      return { success: true };
    } catch (err: unknown) {
      console.error(err, "err");
      setError("Invalid email or password");
      return { success: false, error: "Invalid email or password" };
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
}
