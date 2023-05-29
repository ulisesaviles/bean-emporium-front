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
import { usersAPI } from "@/api/users";
import { sleep } from "@/helpers/timing";

// Icons
import { IoAdd, IoCart, IoRemove } from "react-icons/io5";

// Components
import { useInput } from "@/app/components/input/input";
import { Button } from "@/app/components/button/button";

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

  // Functions
  const addToCart = async () => {
    alert(`Added ${product!.name} to cart.`);
    // // TODO: Get current cart and declare it here
    // let currentCart:Cart = [];

    // // Update current cart
    // currentCart.push({productId: product!.id, quantity: parseInt(quantity)});

    // // Upload updated cart
    // await usersAPI.updateUserCart("<USER_ID>", currentCart);
  };

  const getCurrentPriceRange = (
    quantity: number,
    selectedVariant: ProductVariant
  ) => {
    for (let i = 0; i < selectedVariant?.priceRanges.length; i++) {
      const priceRange = selectedVariant?.priceRanges[i];
      if (
        quantity >= priceRange.minQuantity &&
        quantity <= priceRange.maxQuantity
      )
        return priceRange.price;
    }
    return selectedVariant.priceRanges[selectedVariant.priceRanges.length - 1]
      .price;
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

  // On refresh
  useEffect(() => {
    const onRefresh = async () => {
      if (firstLoad && productId) handleFirstLoad(productId);

      if (productId === undefined) {
        const id = getId(window.location.search);
        console.log({ id });
        if (!id) {
          await sleep(10);
          setRefresher((() => refresher + 1)());
        } else setProductId(id);
      }
    };
    onRefresh();
  }, [productId, refresher]);

  // JSX
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.logo}>Bean Emporium</h3>
        <IoCart className={styles.cart} onClick={() => {}} />
      </header>
      <section
        className={`${
          !productId || !product
            ? styles.productSectionEmpty
            : styles.productSection
        }`}
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
                      src={selectedVariant?.imgUrl}
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
  );
};

export default Product;
