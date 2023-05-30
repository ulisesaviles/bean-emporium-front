import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import { Auth, Hub } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import auth_img from '../../../public/Assets/auth_dialog.png';
import { EmailSent } from './emailSent/emailSent';
import { User } from '@/app/config/types';
import Image from 'next/image';

interface ModalProps {
  visible: boolean;
  onSuccessfulLogin?: any;
  onFailedLogin?: any;
}

enum MODAL_PAGES {
  DIALOG = 'dialog',
  LOGIN = 'login',
  SIGNUP = 'signup',
  EMAIL_SENT = 'emailSent'
}

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_HmHbfdxOA',
    userPoolWebClientId: '3i10api4tbrejsfnpnpvejqgko',
    mandatorySignIn: false,
    oauth: {
      domain: 'bean-auth.auth.us-east-1.amazoncognito.com',
      scope: ['aws.cognito.signin.user.admin', 'openid'],
      redirectSignIn: 'https://google.com',
      redirectSignOut: 'https://google.com',
      responseType: 'token'
    },
  },
});

export const AuthModal = ({visible = false, onSuccessfulLogin, onFailedLogin}: ModalProps) => {
  // const [show, setShow] = useState(visible);
  const [currentPage, setCurrentPage]: [MODAL_PAGES, any] = useState(MODAL_PAGES.DIALOG);
  const [email, setEmail] = useState('');

  useEffect(() => {
  }, [visible, currentPage, email]);

  const handleSuccess = (userId: string, token: string) => {
    if (onSuccessfulLogin) {
      onSuccessfulLogin(userId, token);
    }
  }

  const handleFailed = () => {
    if (onFailedLogin) {
      onFailedLogin();
    }
  }

  const handleSuccesfulSignup = (user: User) => {
    setCurrentPage(MODAL_PAGES.EMAIL_SENT);
    setEmail(user.email);
  }

  return(
    <>
      {
        visible
        ?
        <>
          <div className={styles.modal}>
            {
              currentPage === MODAL_PAGES.DIALOG
              ?
              <div className={styles.wrapper}>
                <Image src={auth_img} alt='auth_image' className={styles.img}/>
                <p>In order to get the tastiest coffee beans on the planet, you need to log in first </p>
                <Button onClick={() => {setCurrentPage(MODAL_PAGES.LOGIN)}} label='Authenticate' />
              </div>
              :
              currentPage === MODAL_PAGES.LOGIN
              ?
              <Login onClickSignup={() => setCurrentPage(MODAL_PAGES.SIGNUP)} onSuccessfulLogin={handleSuccess} onFailLogin={handleFailed}/>
              :
              currentPage === MODAL_PAGES.SIGNUP
              ?
              <Signup onClickLogin={() => setCurrentPage(MODAL_PAGES.LOGIN)} onSuccessfulSignup={handleSuccesfulSignup} onFailSignup={handleFailed}/>
              :
              <EmailSent email={email} onClickLogin={() => setCurrentPage(MODAL_PAGES.LOGIN)} />
            }
          </div>
          <div className={styles.overlay}></div>
        </>
        :
        <></>
      }
    </>
  );

};