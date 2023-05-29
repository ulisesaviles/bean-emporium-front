import { useState } from 'react';
import styles from './styles.module.scss';
import { useInput } from '../../input/input';

interface LoginProps {

}

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [email, emailInput]: [string, JSX.Element] = useInput({label: 'Email', placeholder: 'example@gmail.com'});
  const [password, passwordInput]: [string, JSX.Element] = useInput({label: 'Password', type: 'password'});
  const [form, setForm]:[LoginForm, any] = useState({email, password});

  return(
    <>
      <p>Login</p>
      {emailInput}
      {passwordInput}
    </>
  )
}