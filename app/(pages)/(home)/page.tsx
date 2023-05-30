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
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";

// Assets
import homeAsset from "../../../public/Assets/Home.jpg";

// Components
import Product from "@/app/components/product";
import { useInput } from "@/app/components/input/input";
import { Button } from "@/app/components/button/button";
import DropDown from "@/app/components/dropDown";

import { isLoggedIn } from "@/app/helpers/auth.helper";
import { Popover } from "@/app/components/popover/popover";

// Main react component
const Home = () => {
  // Constants
  const [products, setProducts] = useState<ProductType[] | null | undefined>(
    undefined
  ); // Undefined is initial state, null is for error.
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<
    string | undefined
  >();
  const [lastEvaluatedKey_before, setLastEvaluatedKey_before] = useState<{
    last: undefined | string;
    beforeLast: undefined | string;
  }>({ last: undefined, beforeLast: undefined });
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageSize, setPageSize] = useState<5 | 10 | 20>(10);
  const [searchText, searchInput]: [string, JSX.Element] = useInput({
    placeholder: "Enter a product name...",
  });
  const [logged, setLogged] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  // Functions
  const getData = async (
    search: string,
    pageSize: number,
    lastEvaluatedKey?: string
  ) => {
    setFirstLoad(false);
    setProducts(undefined);

    // If pagination, save last 2 states
    if (lastEvaluatedKey) {
      let lastEvaluatedKey_before_ = { ...lastEvaluatedKey_before };
      lastEvaluatedKey_before_.beforeLast = lastEvaluatedKey_before_.last;
      lastEvaluatedKey_before_.last = lastEvaluatedKey;
      setLastEvaluatedKey_before(lastEvaluatedKey_before_);
    } else
      setLastEvaluatedKey_before({ beforeLast: undefined, last: undefined });

    // Get products
    const productsResponse = await productsAPI.getProducts(
      pageSize,
      search,
      lastEvaluatedKey
    );

    // Load data to state variables
    setProducts(productsResponse.products);
    setLastEvaluatedKey(productsResponse.LastEvaluatedKey);

    if (isLoggedIn()) {
      setLogged(true);
    }
    else {
      setLogged(false);
    }
  };

  // On reload
  useEffect(() => {
    if (firstLoad) getData(searchText, pageSize, lastEvaluatedKey);
  }, [firstLoad, getData, lastEvaluatedKey, logged, showPopover]);

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
          <div style={{display: 'flex', gap: '2rem'}}>
            <Link href={"cart"}>
              <IoCartOutline className={styles.cart} />
            </Link>
            {
              logged
              &&
              <>
                <RxAvatar className={styles.cart} onClick={() => setShowPopover(true)} />
                <Popover visible={showPopover} onClickLogout={getData} onClose={() => setShowPopover(false)}/>
              </>
            }
          </div>
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
          <div className={styles.inputAndBtnContainer}>
            <div style={{ flex: 1 }}>{searchInput}</div>
            <div style={{ marginLeft: 15 }}>
              <Button
                label="Search"
                onClick={() => {
                  getData(searchText, pageSize);
                }}
              />
            </div>
            <div style={{ marginLeft: 15 }}>
              <DropDown
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value as 5 | 10 | 20);
                  getData(searchText, value as number);
                }}
                options={[5, 10, 20]}
              />
            </div>
          </div>
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
        <section className={styles.paginationSection}>
          {lastEvaluatedKey_before.last ? (
            <div style={{ marginRight: 20 }}>
              <Button
                label={`Last ${pageSize}`}
                onClick={() =>
                  getData(
                    searchText,
                    pageSize,
                    lastEvaluatedKey_before.beforeLast
                  )
                }
              />
            </div>
          ) : null}
          {products && lastEvaluatedKey ? (
            <Button
              label={`Next ${pageSize}`}
              onClick={() => {
                getData(searchText, pageSize, lastEvaluatedKey);
              }}
            />
          ) : null}
        </section>
      </main>
    </>
  );
};

export default Home;
