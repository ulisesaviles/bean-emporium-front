import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import Link from 'next/link';

interface ModalProps {
  visible: boolean;
  onClose: any;
}

export const ProductAddedModal = ({visible = false, onClose}: ModalProps) => {
  const [show, setShow] = useState(visible);
  useEffect(() => {
    if (visible !== show) {
      setShow(visible);
    }
  }, [visible, show]);

  const handleClose = () => {
    onClose();
    setShow(false);
  }

  return(
    <>
      {
        show
        ?
        <>
          <div className={styles.modal}>
            <div className={styles.wrapper}>
              {/* <img src={auth_img} className={styles.img} /> */}
              <p>Product successfully added to your cart. Do you want to proceed to review the products on your cart? </p>
              <Link href='cart'>
                <Button label='Go to cart' />
              </Link>
              <Button label='Keep shopping' type='secondary' onClick={handleClose} />
            </div>
          </div>
          <div className={styles.overlay} onClick={() => setShow(false)} ></div>
        </>
        :
        <></>
      }
    </>
  );

};