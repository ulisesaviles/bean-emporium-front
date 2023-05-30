// Type imports
import { Order } from "@/app/config/types";

// Import styles
import styles from "./styles.module.scss";

// NextJS imports
import Image from "next/image";
import beans from '../../../public/Assets/Home.jpg';

// Main react component
const OrderComponent = ({ order }: { order: Order }) => {
  return (
    <>
      <div className={styles.products}>
        {
          order.products.map((product: any) => {
            return(
              <div className={`${styles.product}`} key={product.productId}>
                <div className={styles.left}>
                  <Image src={product.variant.imgUrl} alt="product" className={styles.img} width={15} height={15}/>
                  <div className={styles.information}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.variant}>Variant: {product.variant.name}</p>
                    <p className={styles.variant}>Quantity: <b>{product.quantity}</b></p>
                  </div>
                </div>
                <p className={styles.cost}>{(product.quantity * product.variant.pricePerUnit).toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
              </div>
            )
          })
        }
      </div>
      <div className={styles.footer}>
        <p>Total: {order.total.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
      </div>
    </>
  );
};

export default OrderComponent;
