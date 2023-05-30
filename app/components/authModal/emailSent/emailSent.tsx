import { Button } from '../../button/button';
import styles from './styles.module.scss';
import { useInput } from '../../input/input';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

interface EmailSentProps {
  onClickLogin: any;
  email: string;
};

export const EmailSent = ({onClickLogin, email}: EmailSentProps) => {
  const [code, codeInput] = useInput({label: 'Code', placeholder: 'i.e 12345'});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [email, code, loading]);

  const handleVerify = async () => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, code);
      onClickLogin();
    }
    catch(error) {
      console.log(error);
    }
    setLoading(false);
  }
  return(
    <div className={styles.wrapper}>
      <p>An email has been sent to your inbox to verify your account. Type the code you received to gain access to the greatest cofee beans</p>
      {codeInput}
      <Button label='Verify account' onClick={handleVerify} loading={loading}/>
    </div>
  )
};