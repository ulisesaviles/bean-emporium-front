import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInput } from "../../input/input";
import { Button } from "../../button/button";
import { login } from "@/api/auth";
import Link from "next/link";

interface LoginProps {
  onClickSignup: any;
  onSuccessfulLogin: any;
  onFailLogin: any;
}

export const Login = ({
  onClickSignup,
  onSuccessfulLogin,
  onFailLogin,
}: LoginProps) => {
  const [email, emailInput]: [string, JSX.Element] = useInput({
    label: "Email",
    placeholder: "example@gmail.com",
  });
  const [password, passwordInput]: [string, JSX.Element] = useInput({
    label: "Password",
    type: "password",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { userId, token } = await login(email, password);
      onSuccessfulLogin(userId, token);
    } catch (error) {
      console.log(error);
      onFailLogin();
    }
    setLoading(false);
  };

  useEffect(() => {}, [loading]);

  return (
    <div className={styles.login}>
      <p className="header">Login</p>
      {emailInput}
      {passwordInput}
      <Button label="Log in" onClick={handleLogin} loading={loading} />
      <Link href={""}>
        <Button label="Cancelar" onClick={() => {}} type="secondary" />
      </Link>
      <p className={styles.signup} onClick={() => onClickSignup()}>
        Don&apos;t have an account? Sign up!
      </p>
    </div>
  );
};
