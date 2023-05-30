"use client"; // this is a client component

import { Button } from "@/app/components/button/button";
// Local styles
import styles from "./styles.module.scss";
import Image from "next/image";
import purchase_img from '../../../public/Assets/purchase.png';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cart, LC_KEYS, Order } from "@/app/config/types";
import { AuthModal } from "@/app/components/authModal/authModal";
import { isLoggedIn } from "@/app/helpers/auth.helper";
import { getCurrentPriceRange } from "@/app/helpers/product.helper";
import { ordersAPI } from "@/api/orders";

// Main React component
const Checkout = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authModal, setVisible] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleFirstLoad = () => {
    const res = isLoggedIn();
    if (res) {
      setUserId(res.userId);
      setToken(res.token);

      const cart = JSON.parse(localStorage.getItem(LC_KEYS.CART)!);
      setCart(cart);
    }
    else {
      setVisible(true);
    }
  }

  const handlePurchase = async () => {
    let total = 0
    const products: any[] = cart!.map((prod: any) => {
      total += getCurrentPriceRange(parseFloat(prod.quantity), prod.variant) * prod.quantity;
      return {
        productId: prod.productId,
        name: prod.name,
        variant: {
          id: prod.variant.id,
          name: prod.variant.name,
          pricePerUnit: getCurrentPriceRange(parseFloat(prod.quantity), prod.variant)
        },
        quantity: parseFloat(prod.quantity)
      } as {
        productId: string,
        name: string,
        variant: {
          id: string,
          name: string,
          pricePerUnit: number,
          imgUrl: string
        },
        quantity: number
      };
    });
    const order: Order = {
      id: (new Date()).getTime().toString(),
      userId: userId!,
      products,
      timestamp: (new Date()).getTime(),
      total
    }

    console.log(order);

    try {
      const newOrder = await ordersAPI.createOrder(order);
      console.log(newOrder);
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleFirstLoad();
    }
  }, [authModal, cart]);

  return (
    <main className={styles.main}>
      <AuthModal visible={authModal} onSuccessfulLogin={handleFirstLoad}/>
      <Image src={purchase_img} alt="purchase" className={styles.img}/>
      <Link href='orders'>
        <Button label="Purchase" onClick={handlePurchase}/>
      </Link>
    </main>
  );
};

export default Checkout;
