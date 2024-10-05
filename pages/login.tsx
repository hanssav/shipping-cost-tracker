import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "styled-components";
import Header from "@/components/Header";
import { registerUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: email,
        password: password,
      });
      const { accessToken } = response.data;
      dispatch(registerUser(response));

      localStorage.setItem("token", accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Header />
      <LoginContainer>
        <h1>Login</h1>
        <Input
          label="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          label="Login"
          onClick={handleLogin}
          disabled={!email || !password}
        />
      </LoginContainer>
    </>
  );
};

export default Login;
