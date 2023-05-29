import { useState } from 'react';
import styles from './styles.module.scss';
import { useInput } from '../../input/input';
import { Button } from '../../button/button';

interface LoginProps {
  onClickSignup: any;
}

interface LoginForm {
  email: string;
  password: string;
}

export const Login = ({onClickSignup}: LoginProps) => {
  const [email, emailInput]: [string, JSX.Element] = useInput({label: 'Email', placeholder: 'example@gmail.com'});
  const [password, passwordInput]: [string, JSX.Element] = useInput({label: 'Password', type: 'password'});
  const [form, setForm]:[LoginForm, any] = useState({email, password});

  return(
    <div className={styles.login}>
      <p className='header'>Login</p>
      {emailInput}
      {passwordInput}
      <Button label='Log in'/>
      <p className={styles.signup} onClick={() => onClickSignup()} >Don't have an account? Sign up!</p>
    </div>
  )
}