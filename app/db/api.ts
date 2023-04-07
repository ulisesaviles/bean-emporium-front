// HTTP handler
import axios from "axios";

// Types
import { Product } from "../config/types";

// Products
export const getProducts = async (): Promise<Product[]> => {
  return (await axios.get("<api gateway url>")).data as Product[];
};
