"use client"; // this is a client component

import { Button } from "@/app/components/button/button";
// Local styles
import styles from "./styles.module.scss";
import Image from "next/image";
import purchase_img from '../../../public/Assets/purchase.png';
import Link from "next/link";

// Main React component
const Checkout = () => {
  return (
    <main className={styles.main}>
      <Image src={purchase_img} alt="purchase" className={styles.img}/>
      <Link href='orders'>
        <Button label="Purchase"/>
      </Link>
    </main>
  );
};

export default Checkout;
