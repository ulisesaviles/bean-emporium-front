import Link from 'next/link';
import styles from './styles.module.scss';

import { IoCartOutline } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { Popover } from '../popover/popover';
import { isLoggedIn } from '@/app/helpers/auth.helper';

interface HeaderProps {
  isLogged?: boolean;
}

export const Header = ({isLogged = false}: HeaderProps) => {
  const [logged, setLogged] = useState(isLogged);
  const [showPopover, setShowPopover] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleLogout = () => {
    setLogged(false);
  }

  useEffect(() => {
    if (isLoggedIn()) {
      setLogged(true);
    }
    else {
      setLogged(false);
    }
  }, [logged, showPopover, isLogged]);

  return(
    <header className={styles.header}>
      <Link href=''>
        <h3 className={styles.logo}>Bean Emporium</h3>
      </Link>
      <div style={{display: 'flex', gap: '2rem'}}>
        <Link href={"cart"}>
          <IoCartOutline className={styles.cart} />
        </Link>
        {
          logged
          &&
          <>
            <RxAvatar className={styles.cart} onClick={() => setShowPopover(true)} />
            <Popover visible={showPopover} onClickLogout={handleLogout} onClose={() => setShowPopover(false)}/>
          </>
        }
      </div>
    </header>
  )
}