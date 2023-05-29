"use client"; // this is a client component

// React imports
import { useEffect, useState } from "react";

// NextJS imports
import Head from "next/head";
import Link from "next/link";

// Import styles
import styles from "./styles.module.scss";

// API handlers
import { productsAPI } from "@/api/products";

// Types
import { Product as ProductType } from "@/app/config/types";

// Icons
import { IoCart } from "react-icons/io5";
import Image from "next/image";

// Assets
import homeAsset from "../../../public/Assets/Home.jpg";

// Components
import Product from "@/app/components/product";
import { useInput } from "@/app/components/input/input";

// Main react component
const Home = () => {
  // Constants
  const [products, setProducts] = useState<ProductType[] | null | undefined>(
    undefined
  ); // Undefined is initial state, null is for error.
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<
    string | undefined
  >();
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageSize, setPageSize] = useState<5 | 10 | 20>(10);
  const [searchText, searchInput]: [string, JSX.Element] = useInput({
    placeholder: "Enter a product name...",
  });

  // Functions
  const getData = async (lastEvaluatedKey?: string) => {
    setFirstLoad(false);

    // Get products
    const productsResponse = await productsAPI.getProducts(
      pageSize,
      lastEvaluatedKey
    );

    // Load data to state variables
    setProducts(productsResponse.products);
    setLastEvaluatedKey(productsResponse.LastEvaluatedKey);
  };

  // On reload
  useEffect(() => {
    if (firstLoad) getData(lastEvaluatedKey);
  }, [firstLoad, getData, lastEvaluatedKey]);

  // JSX
  return (
    <>
      <Head>
        <title>Bean emporium</title>
        <meta name="description" content="bean emporium" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h3 className={styles.logo}>Bean Emporium</h3>
          <Link href={"cart"}>
            <IoCart className={styles.cart} />
          </Link>
        </header>
        <section className={styles.section1Container}>
          <Image src={homeAsset} alt="Coffee" className={styles.section1Img} />
          <h1 className={styles.section1Slogan}>Un slogan bien vergas</h1>
          <p className={styles.section1Description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vestibulum ac nisl ut luctus. Aliquam risus massa, accumsan eget
            sagittis vitae, ullamcorper eu nisi. Donec sed enim ante. Praesent
            porttitor odio ut lobortis consequat.{" "}
          </p>
          <div style={{ width: "100%" }}>{searchInput}</div>
        </section>
        <section
          className={`${
            styles[
              products === undefined || products === null
                ? "section2ContainerLoading"
                : "section2ContainerGrid"
            ]
          }`}
        >
          {products === undefined
            ? "Loading..."
            : products === null
            ? "Error;("
            : products.map((product) => (
                <Link href={`/product?id=${product.id}`} key={product.id}>
                  <Product product={product} />
                </Link>
              ))}
        </section>
      </main>
    </>
  );
};

export default Home;
