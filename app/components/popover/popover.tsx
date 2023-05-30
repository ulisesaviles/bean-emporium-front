import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface PopoverProps {
  visible: boolean;
  onClickLogout: any;
  onClose: any;
}

export const Popover = ({visible = false, onClickLogout, onClose}: PopoverProps) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible !== show) {
      setShow(visible);
    }
  }, [visible, show]);

  const handleClose = () => {
    onClose();
    setShow(false);
  };

  const handleLogout = () => {
    setShow(false);
    onClose();
    localStorage.clear();
    onClickLogout();
  };

  return(
    <>
      {
        show
        ?
        <>
          <div className={styles.popover}>
            <Link href='orders'>
              <div className={styles.option}>
                <p>My orders</p>
              </div>
            </Link>
            <Link href=''>
              <div className={`${styles.option} ${styles.logout}`} onClick={handleLogout}>
                <p>Logout</p>
              </div>
            </Link>
          </div>
          <div className={styles.pane} onClick={handleClose}></div>
        </>
        :
        <></>
      }
    </>
  )
}