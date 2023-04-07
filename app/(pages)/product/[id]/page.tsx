// Metadata
export const metadata = {
  title: "Bean emporium | Product",
};

// Local styles
import styles from "./styles.module.css";

// Types
type Props = { params: { id: string } };

// Main React component
const Product = ({ params: { id: productId } }: Props) => {
  return (
    <main className={styles.main}>
      <p>Product id: {productId}</p>
    </main>
  );
};

export default Product;
