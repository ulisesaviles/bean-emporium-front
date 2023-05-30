"use client"; // this is a client component

import { AuthModal } from "@/app/components/authModal/authModal";
// Local styles
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { LC_KEYS } from "@/app/config/types";
import Image from "next/image";
import beans from '../../../public/Assets/Home.jpg';
import empty_cart_img from '../../../public/Assets/empty_cart.png';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from "@/app/components/button/button";
import { cartAPI } from "@/api/cart";
import Link from "next/link";
import { getCurrentPriceRange } from "@/app/helpers/product.helper";
import { Header } from "@/app/components/header/header";

// Main React component
const Cart = () => {
  const [modalVisible, setVisible] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [userId, setUserId] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [products, setProducts]: [any[], any] = useState([]);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleFirstLoad();
    }
  }, [firstLoad, isLogged]);

  const handleFirstLoad = async () => {
    const userId = localStorage.getItem(LC_KEYS.USER_ID);
    setUserId(userId);
    const token = localStorage.getItem(LC_KEYS.SESSION_TOKEN);
    setToken(token);
    if (!userId || !token) {
      setVisible(true);
    }
    else {
      const cart = await cartAPI.getCart();
      setProducts(cart);
    }
  };

  const handleLogin = async (userId: string, token: string) => {
    setVisible(false);
    setLogged(true);
    setUserId(userId);
    setToken(token);
    const cart = await cartAPI.getCart();
    setProducts(cart);
  };

  const handleChangeQuantity = (newValue: string, index: number) => {
    let newProducts = [...products];
    newProducts[index].quantity = isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue);
    newProducts[index].total = newProducts[index].quantity * getCurrentPriceRange(newProducts[index].quantity, newProducts[index].variant);
    setProducts(newProducts);
  };

  const handleClickRemove = (index: number) => {
    const newProducts = [...products.slice(0,index), ...products.slice(index + 1, products.length)];
    setProducts(newProducts);
  }

  const handleUpdateCart = async() => {
    try {
      const cart = await cartAPI.updateCart(products);

    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.main}>
      <AuthModal visible={modalVisible} onSuccessfulLogin={handleLogin} />
      <Header isLogged={isLogged}/>
      <div>
        <Link href=''>
          <BiArrowBack className={styles.back}/>
        </Link>
        <p className="title">Cart</p>
      </div>

      <div className={styles.products}>
        {
          products.length !== 0
          ?
          products.map((product, index) => {
            return  (
              <div className={`${styles.product}`} key={product.id}>
                <div className={styles.left}>
                  <Image src={beans} alt="beans" className={styles.img} />
                  <div className={styles.information}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.variant}>Variant: {product.variant.name}</p>
                    <input type="number" value={product.quantity} className={styles.cartInput} onChange={(e) => handleChangeQuantity(e.target.value, index)}/>
                  </div>
                </div>
                <p className={styles.cost}>{product.total.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                <IoMdRemoveCircle className={styles.remove} onClick={() => handleClickRemove(index)}/>
              </div>
            )
          })
          :
          <div className={styles.placeholder}>
            <Image src={empty_cart_img} alt="empty_cart" className={styles.img} />
            <p>You don&apos;t have anything on your cart yet </p>
            <Link href=''>
              <Button label="Start shopping"/>
            </Link>
          </div>
        }
      </div>

      {
        products.length !== 0
        &&
        <div className={styles.footer}>
          <Button type="secondary" label="Update cart" onClick={handleUpdateCart} />
          <Link href='checkout'>
            <Button label="Go to checkout" />
          </Link>
        </div>
      }
    </div>
  );
};

export default Cart;
