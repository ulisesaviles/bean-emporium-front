// Type imports
import { Product } from "@/app/config/types";

// Import styles
import styles from "./styles.module.scss";

// NextJS imports
import Image from "next/image";

// Main react component
const Product = ({ product }: { product: Product }) => {
  return (
    <div className={styles.container}>
      <Image
        src={product.variants[0].imgUrl}
        alt={product.name}
        className={styles.img}
        width={1}
        height={1}
      />
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
    </div>
  );
};

export default Product;
