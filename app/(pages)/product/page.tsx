"use client"; // this is a client component
// Has to be accessed with query string:
//   https://bean-emporium.cetystijuana.com/product?id=productId1

// React imports
import { useEffect, useState } from "react";

// NextJS imports
import Image from "next/image";

// Local styles
import styles from "./styles.module.scss";

// Types
import { Cart, Product, ProductVariant } from "@/app/config/types";

// Helpers
import { productsAPI } from "@/api/products";
import { sleep } from "@/helpers/timing";

// Icons
import { IoAdd, IoCartOutline, IoRemove } from "react-icons/io5";

// Components
import { useInput } from "@/app/components/input/input";
import { Button } from "@/app/components/button/button";
import { cartAPI } from "@/api/cart";
import { ProductAddedModal } from "@/app/components/productAddedModal/productAddedModal";
import { AuthModal } from "@/app/components/authModal/authModal";
import { getCurrentPriceRange } from "@/app/helpers/product.helper";
import { Header } from "@/app/components/header/header";

// Get id from url
const getId = (searchQuery: string): string | undefined => {
  if (!searchQuery.includes("id")) return;
  let id = searchQuery.substring(searchQuery.indexOf("id") + 3);
  if (id.includes("&")) id = id.substring(0, id.indexOf("&"));
  return id;
};

// Main React component
const Product = () => {
  // Constants
  const [productId, setProductId] = useState<string | undefined>();
  const [firstLoad, setFirstLoad] = useState(true);
  const [product, setProduct] = useState<Product | null>();
  const [refresher, setRefresher] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [quantity, quantityInput] = useInput({
    defaultValue: "1",
    placeholder: "Enter the quantity",
    type: "number",
    label: "Quantity (gr)",
  });
  const [cartModal, setCartVisible] = useState(false);
  const [authModal, setAuthVisible] = useState(false);

  // Functions
  const addToCart = async () => {
    try {
      const selectedProduct = {
        productId: product?.id,
        variant: selectedVariant,
        name: product?.name,
        quantity,
        total:
          getCurrentPriceRange(parseInt(quantity), selectedVariant!) *
          parseInt(quantity),
      };
      const cart = await cartAPI.addProductToCart(selectedProduct!);
      setCartVisible(true);
    } catch (error) {
      setAuthVisible(true);
    }
  };

  const handleFirstLoad = async (productId: string) => {
    setFirstLoad(false);
    const product = await productsAPI.getProduct(productId);
    if (!product) {
      setProduct(null);
      return;
    }
    setProduct(product);
    setSelectedVariant(product.variants[0]);
  };

  const handleLogin = async () => {
    try {
      setAuthVisible(false);
      await addToCart();
      setCartVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  // On refresh
  useEffect(() => {
    const onRefresh = async () => {
      if (firstLoad && productId) handleFirstLoad(productId);

      if (productId === undefined) {
        const id = getId(window.location.search);
        if (!id) {
          await sleep(10);
          setRefresher((() => refresher + 1)());
        } else setProductId(id);
      }
    };
    onRefresh();
  }, [productId, refresher, cartModal]);

  // JSX
  return (
    <>
      <ProductAddedModal
        visible={cartModal}
        onClose={() => setCartVisible(false)}
      ></ProductAddedModal>
      <AuthModal
        visible={authModal}
        onSuccessfulLogin={handleLogin}
        onFailedLogin={() => {}}
      />
      <main className={styles.main}>
        <Header />
        <section
          className={
            !productId || !product
              ? styles.productSectionEmpty
              : styles.productSection
          }
        >
          {!productId || product === undefined || !selectedVariant ? (
            "Loading..."
          ) : product === null ? (
            "Error while getting the product"
          ) : (
            <div className={styles.productSubContainer}>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.imgSectionContainer}>
                <Image
                  className={styles.mainImg}
                  alt={product.name}
                  src={selectedVariant?.imgUrl}
                  width={10}
                  height={10}
                />
                <div className={styles.variantsContainer}>
                  {product.variants.map((variant, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedVariant(variant)}
                      className={`${styles.variantContainer} ${
                        variant.id === selectedVariant.id
                          ? styles.selectedVariantContainer
                          : ""
                      }`}
                    >
                      <Image
                        className={styles.variantImg}
                        alt={variant.name}
                        src={variant.imgUrl}
                        width={10}
                        height={10}
                      />
                      <h6 className={styles.variantName}>{variant.name}</h6>
                    </div>
                  ))}
                </div>
              </div>
              <h2 className={styles.pricesLabel}>Prices:</h2>
              <ul className={styles.priceRanges}>
                {selectedVariant.priceRanges.map((priceRange, i) => (
                  <li key={i} className={styles.priceRange}>
                    <strong>
                      {priceRange.minQuantity}gr - {priceRange.maxQuantity}gr:
                    </strong>{" "}
                    ${priceRange.price}/gr
                  </li>
                ))}
              </ul>
              <section className={styles.orderContainer}>
                <h6 className={styles.orderTitle}>Order</h6>
                {quantityInput}
                <div className={styles.orderPriceSectionContainer}>
                  <h3 className={styles.priceToPay}>Price to pay</h3>
                  <p className={styles.orderPrice}>
                    ${" "}
                    {quantity === ""
                      ? 0
                      : (
                          getCurrentPriceRange(
                            parseInt(quantity),
                            selectedVariant
                          ) * parseInt(quantity)
                        ).toLocaleString()}{" "}
                    mxn
                  </p>
                </div>
                <div className={styles.buttonContainer}>
                  <Button label="Add to cart" onClick={addToCart} />
                </div>
              </section>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Product;
