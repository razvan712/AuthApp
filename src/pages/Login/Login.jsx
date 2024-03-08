import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import { useMutation } from "react-query";
import {
  LoginContainer,
  Form,
  Input,
  Button,
  ErrorMsg,
  InstructionText,
} from "./LoginStyles";
import { useState } from "react";

const Login = () => {
  const [isSmallLenght, setIsSmallLenght] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate, isError } = useMutation((data) =>
    axios.get(`https://gorest.co.in/public/v2/users?access-token=${data.token}`)
  );

  const onSubmit = async (data) => {
    console.log(data, "data");
    data.token.length < 64
      ? setIsSmallLenght(true)
      : mutate(data, {
          onSuccess: () => {
            console.log(data.token, "token inside onSuccess");
            login(data.token);
            navigate("/dashboard");
          },
        });
  };

  return (
    <LoginContainer>
      <InstructionText>
        To log in, please obtain your API token from{" "}
        <a
          href="https://gorest.co.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GoRest API
        </a>
        . Navigate to the &quot;Access Token&quot; section after signing up or
        logging in.
      </InstructionText>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("token")}
          placeholder="Enter token"
          required
          autoComplete="off"
        />
        {isError && <ErrorMsg>Invalid token</ErrorMsg>}
        {isSmallLenght && <ErrorMsg>Token length is too small</ErrorMsg>}
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
