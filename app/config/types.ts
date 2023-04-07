export type Cart = {
  productId: string;
  quantity: number;
}[];

export type User = {
  id: string;
  name: string;
  email: string;
  cart: Cart;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  variants: {
    name: string;
    priceRanges: [
      {
        minQuantity: number;
        maxQuantity: number;
        price: number;
      }
    ];
    imgUrl: string;
  }[];
  stock: number;
  minPerPurchase: number;
};

export type Order = {
  id: string;
  userId: string;
  products: {
    productId: string;
    name: string;
    variant: {
      id: string;
      name: string;
      pricePerUnit: number;
      imgUrl: string;
    };
    quantity: number;
  }[];
  timestamp: number;
  total: number;
  cancelled: boolean;
};
