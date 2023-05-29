import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import { Auth, Hub } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import auth_img from '../../assets/img/auth_dialog.png';

interface ModalProps {
  visible: boolean;
  onSuccessfulLogin?: any;
  onFailedLogin?: any;
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

export const AuthModal = ({visible = false, onSuccessfulLogin, onFailedLogin}: ModalProps) => {
  // const [show, setShow] = useState(visible);
  const [currentPage, setCurrentPage]: [MODAL_PAGES, any] = useState(MODAL_PAGES.DIALOG)

  useEffect(() => {
    console.log(visible);
  }, [visible, currentPage]);

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
              <>
                {/* <img src={auth_img} className={styles.img} /> */}
                <p>In order to get the tastiest coffee beans on the planet, you need to log in first </p>
                <Button onClick={() => {setCurrentPage(MODAL_PAGES.LOGIN)}} label='Authenticate' />
              </>
              :
              currentPage === MODAL_PAGES.LOGIN
              ?
              <Login onClickSignup={() => setCurrentPage(MODAL_PAGES.SIGNUP)} onSuccessfulLogin={handleSuccess} onFailLogin={handleFailed}/>
              :
              <Signup onClickLogin={() => setCurrentPage(MODAL_PAGES.LOGIN)} onSuccessfulSignup={() => setCurrentPage(MODAL_PAGES.LOGIN)} onFailSignup={handleFailed}/>
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