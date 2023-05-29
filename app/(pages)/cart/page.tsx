"use client"; // this is a client component

import { AuthModal } from "@/app/components/authModal/authModal";
// Local styles
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { LC_KEYS } from "@/app/config/types";

// Main React component
const Cart = () => {
  const [modalVisible, setVisible] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [userId, setUserId] = useState<string | null>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleFirstLoad();
    }
  }, [firstLoad]);

  const handleFirstLoad = () => {
    const userId = localStorage.getItem(LC_KEYS.USER_ID);
    setUserId(userId);
    const token = localStorage.getItem(LC_KEYS.SESSION_TOKEN);
    setToken(token);
    if (!userId || !token) {
      setVisible(true);
    }
  };

  const handleLogin = (userId: string, token: string) => {
    setVisible(false);
    setUserId(userId);
    setToken(token);
  };
  return (
    <main className={styles.main}>
      <p>Cart</p>
      <p>{userId}</p>
      <p>{token}</p>
      <AuthModal visible={modalVisible} onSuccessfulLogin={handleLogin} />
    </main>
  );
};

export default Cart;
