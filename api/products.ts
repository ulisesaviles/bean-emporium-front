// Product type
import { Product } from "@/app/config/types";

// Base API request
import { baseRequest } from "./config";

/**
 * Upload product to DB.
 * @param product The full product to upload,
 * @returns A promise with the uploaded product.
 */
const createProduct = async (product: Product): Promise<Product> => {
  const { newProduct } = (
    await baseRequest("POST", `products`, undefined, { product }, true)
  ).data as { newProduct: Product };
  return newProduct;
};

/**
 * Delete a product based on its id.
 * @param id The product's id.
 * @returns An empty promise.
 */
const deleteProduct = async (productId: string): Promise<void> => {
  await baseRequest("DELETE", `products/${productId}`, undefined, undefined, true);
};

/**
 * Get a product based on its id.
 * @param id The product's id.
 * @returns A promise with the product object.
 */
const getProduct = async (productId: string): Promise<Product | undefined> => {
  const { product } = (await baseRequest("GET", `products/${productId}`))
    .data as { product: Product | undefined };
  return product;
};

/**
 * Get N products from last evaluated id.
 * @param pageSize The number of items to retrieve.
 * @param LastEvaluatedKey The id of the last item, which is used to get the next N items, starting from here.
 * It's not necessary if it's the fist query.
 * @returns A promise with the response's message and the DynamoDB Item.
 */
const getProducts = async (
  pageSize: number,
  search: string,
  LastEvaluatedKey?: string
): Promise<{ products: Product[]; LastEvaluatedKey?: string }> => {
  let params: { pageSize: string; LastEvaluatedKey?: string; search?: string } =
    {
      pageSize: pageSize.toString(),
    };
  search !== "" ? (params.search = search) : null;
  LastEvaluatedKey ? (params.LastEvaluatedKey = LastEvaluatedKey) : null;
  const { products, LastEvaluatedKey: newLastEvaluatedKey } = (
    await baseRequest("GET", `products`, params)
  ).data as {
    products: Product[];
    LastEvaluatedKey?: { id: string };
  };
  return {
    products,
    LastEvaluatedKey: newLastEvaluatedKey ? newLastEvaluatedKey.id : undefined,
  };
};

/**
 * Update a product by id.
 * @param productId The products's id.
 * @param newProductFields The product's fields to update.
 * @returns A promise with the updated product.
 */
const updateProduct = async (
  productId: string,
  newProductFields: Partial<Product>
): Promise<Product> => {
  const { product } = (
    await baseRequest("PATCH", `products/${productId}`, undefined, {
      newProductFields,
    }, true)
  ).data as { product: Product };
  return product;
};

// Products api methods
export const productsAPI = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
