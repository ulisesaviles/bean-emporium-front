import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import { Auth, Hub } from 'aws-amplify';
import { Amplify } from 'aws-amplify';

interface ModalProps {
  visible: boolean;
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
      responseType: 'code'
    },
  },
});

export const AuthModal = ({visible = true}: ModalProps) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {

    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event, data);
      // switch (event) {
      //   case 'signIn':
      //   case 'cognitoHostedUI':
      //     console.log('Authenticated...');
      //     console.log(data);
      //     break;
      //   case 'signIn_failure':
      //   case 'cognitoHostedUI_failure':
      //     console.log('Error', data);
      //     break;
      // }
    });
  }, [visible, show]);

  return(
    <>
      {
        show
        ?
        <>
          <div className={styles.modal}>
              <p>In order to get the tastiest coffee beans on the planet, you need to log in first </p>
              <Button onClick={() => Auth.federatedSignIn()} />
          </div>
          <div className={styles.overlay} onClick={() => setShow(false)}></div>
        </>
        :
        <></>
      }
    </>
  );

};