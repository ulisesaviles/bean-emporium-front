import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import { Auth, Hub } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { Login } from './login/login';
import { Signup } from './signup/signup';

interface ModalProps {
  visible: boolean;
}

enum MODAL_PAGES {
  DIALOG = 'dialog',
  LOGIN = 'login',
  SIGNUP = 'signup'
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

export const AuthModal = ({visible = true}: ModalProps) => {
  const [show, setShow] = useState(visible);
  const [currentPage, setCurrentPage]: [MODAL_PAGES, any] = useState(MODAL_PAGES.DIALOG)

  useEffect(() => {
  }, [visible, show, currentPage]);

  return(
    <>
      {
        show
        ?
        <>
          <div className={styles.modal}>
            {
              currentPage === MODAL_PAGES.DIALOG
              ?
              <>
                <p>In order to get the tastiest coffee beans on the planet, you need to log in first </p>
                <Button onClick={() => {setCurrentPage(MODAL_PAGES.LOGIN)}} label='Authenticate' />
              </>
              :
              currentPage === MODAL_PAGES.LOGIN
              ?
              <Login onClickSignup={() => setCurrentPage(MODAL_PAGES.SIGNUP)}/>
              :
              <Signup onClickLogin={() => setCurrentPage(MODAL_PAGES.LOGIN)}/>
            }
          </div>
          <div className={styles.overlay} onClick={() => setShow(false)}></div>
        </>
        :
        <></>
      }
    </>
  );

};