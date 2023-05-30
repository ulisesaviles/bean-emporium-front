"use client"; // this is a client component

import { AuthModal } from "@/app/components/authModal/authModal";
// Local styles
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { LC_KEYS, Order } from "@/app/config/types";
import Image from "next/image";
import beans from '../../../public/Assets/Home.jpg';
import empty_cart_img from '../../../public/Assets/empty_cart.png';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from "@/app/components/button/button";
import Link from "next/link";
import { Header } from "@/app/components/header/header";
import { ordersAPI } from "@/api/orders";
import OrderComponent from "@/app/components/order";

// Main React component
const Orders = () => {
  const [modalVisible, setVisible] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [userId, setUserId] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [orders, setOrders]: [any[], any] = useState([]);
  const [isLogged, setLogged] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleFirstLoad();
    }
  }, [firstLoad, isLogged, currentOrder]);

  const handleGetOrders = async () => {
    try {
      const orders = await ordersAPI.getOrders();
      console.log(orders);
      setOrders(orders);
    }
    catch(error) {
      console.log(error);
    }
  }

  const handleFirstLoad = async () => {
    const userId = localStorage.getItem(LC_KEYS.USER_ID);
    setUserId(userId);
    const token = localStorage.getItem(LC_KEYS.SESSION_TOKEN);
    setToken(token);
    if (!userId || !token) {
      setVisible(true);
    }
    else {
      await handleGetOrders();
    }
  };

  const handleLogin = async (userId: string, token: string) => {
    setVisible(false);
    setLogged(true);
    setUserId(userId);
    setToken(token);
    await handleGetOrders();
  };

  return (
    <div className={styles.main}>
      <AuthModal visible={modalVisible} onSuccessfulLogin={handleLogin} />
      <Header isLogged={isLogged}/>
      <div>
        {
          currentOrder !== null
          ?
          <Link href='orders'>
            <BiArrowBack className={styles.back} onClick={() => setCurrentOrder(null)}/>
          </Link>
          :
          <Link href=''>
            <BiArrowBack className={styles.back}/>
          </Link>
        }
        <p className="title">{currentOrder !== null ? 'Order detail' : 'Orders'}</p>
      </div>

      {
        currentOrder === null
        ?
        <div className={styles.orders}>
          {
            orders.length !== 0
            ?
            orders.map((order) => {
              return  (
                <div className={`${styles.order}`} key={order.id} onClick={() => setCurrentOrder(order)}>
                  <div className={styles.left}>
                    <Image src={beans} alt="beans" className={styles.img} />
                    <div className={styles.information}>
                      <p className={styles.name}>{(new Date(order.timestamp)).toLocaleDateString('en-US', {dateStyle: 'medium'})}</p>
                      <p className={styles.variant}>Products: <b>{order.products.length}</b></p>
                    </div>
                  </div>
                  <p className={styles.cost}>{order.total.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                </div>
              )
            })
            :
            <div className={styles.placeholder}>
              <Image src={empty_cart_img} alt="empty_cart" className={styles.img} />
              <p>You don&apos;t have a purchase history</p>
              <Link href=''>
                <Button label="Start shopping"/>
              </Link>
            </div>
          }
        </div>
        :
        <OrderComponent order={currentOrder} />
      }
    </div>
  );
};

export default Orders;
