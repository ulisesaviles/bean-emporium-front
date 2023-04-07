// Has to be accessed with query string:
//   https://bean-emporium.cetystijuana.com/product?id=productId1

"use client"; // this is a client component

// React imports
import { useEffect, useState } from "react";

// Local styles
import styles from "./styles.module.css";

// Get id from url
const getId = (searchQuery: string): string | undefined => {
  if (!searchQuery.includes("id")) return;
  let id = searchQuery.substring(searchQuery.indexOf("id") + 3);
  if (id.includes("&")) id = id.substring(0, id.indexOf("&"));
  return id;
};

// Main React component
const Product = () => {
  const [productId, setProductId] = useState<string | undefined>();
  useEffect(() => setProductId(getId(window.location.search)), []);

  return (
    <main className={styles.main}>
      <p>Product id: {JSON.stringify(productId)}</p>
    </main>
  );
};

export default Product;
