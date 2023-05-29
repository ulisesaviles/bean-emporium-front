import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInput } from "../../input/input";
import { Button } from "../../button/button";
import { SignupForm } from "@/app/config/types";
import { validateSignupForm } from "@/app/helpers/auth.helper";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import { signup } from "@/api/auth";

interface SignupProps {
  onClickLogin: any;
  onSuccessfulSignup: any;
  onFailSignup: any;
}

export const Signup = ({
  onClickLogin,
  onSuccessfulSignup,
  onFailSignup,
}: SignupProps) => {
  const [name, nameInput]: [string, JSX.Element] = useInput({
    label: "Name",
    placeholder: "i.e John Doe",
    required: true,
    onChange: (newValue: string) => {
      setForm({ ...form, name: newValue });
    },
  });
  const [email, emailInput]: [string, JSX.Element] = useInput({
    label: "Email",
    placeholder: "example@gmail.com",
    required: true,
    onChange: (newValue: string) => {
      setForm({ ...form, email: newValue });
    },
  });
  const [password, passwordInput]: [string, JSX.Element] = useInput({
    label: "Password",
    type: "password",
    required: true,
    onChange: (newValue: string) => {
      setForm({ ...form, password: newValue });
    },
  });
  const [confirmPassword, confirmPasswordInput]: [string, JSX.Element] =
    useInput({
      label: "Confirm Password",
      type: "password",
      required: true,
      onChange: (newValue: string) => {
        setForm({ ...form, confirmPassword: newValue });
      },
    });
  const [form, setForm]: [SignupForm, any] = useState({
    name,
    email,
    password,
    confirmPassword,
  });
  const [errors, setErrors]: [string[], any] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormChange = () => {
    const err = validateSignupForm(form);
    setErrors(err);

    if (err.length === 0) {
      setDisabled(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (errors.length === 0) {
        const user = await signup(name, email, password);
        if (onSuccessfulSignup) {
          onSuccessfulSignup(user);
        }
      }
    } catch (error) {
      console.log(error);
      onFailSignup();
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFormChange();
  }, [form, name, email, password, confirmPassword, handleFormChange]);

  return (
    <div className={styles.signup}>
      <p className="header">Sign up</p>
      {nameInput}
      {emailInput}
      {passwordInput}
      {confirmPasswordInput}

      {errors.length !== 0 && (
        <div className={styles.errors}>
          {errors.map((error, i) => (
            <div className={styles.error} key={i}>
              <IoMdCloseCircleOutline className={styles.icon} />
              <p>{error}</p>
            </div>
          ))}
        </div>
      )}

      <Button
        label="Sign up"
        disabled={disabled}
        loading={loading}
        onClick={handleSignUp}
      />
      <Link href={""}>
        <Button label="Cancelar" onClick={() => {}} type="secondary" />
      </Link>
      <p className={styles.login} onClick={() => onClickLogin()}>
        Already have an account? Log in
      </p>
    </div>
  );
};
