// Types
import { Cart, User } from "@/app/config/types";

// Base API request
import { baseRequest } from "./config";

/**
 * Create a user given their data.
 * @param cognitoId The cognito id to assign it to the user.
 * @param name The user's personal name.
 * @param email The user's email.
 * @returns A promise with the uploaded user.
 */
const createUser = async (
  cognitoId: string,
  name: string,
  email: string
): Promise<User> => {
  const { user } = (
    await baseRequest("POST", `users`, undefined, {
      userData: { id: cognitoId, name, email },
    })
  ).data as { user: User };
  return user;
};

/**
 * Get a user based on its id.
 * @param userId The user's id.
 * @returns A promise with the user object.
 */
const getUser = async (userId: string): Promise<User | undefined> => {
  const { user } = (await baseRequest("GET", `users/${userId}`)).data as {
    user: User | undefined;
  };
  return user;
};

/**
 * Get a user's cart based on its userId.
 * @param userId The user's id.
 * @returns A promise with the cart object.
 */
const getUserCart = async (userId: string): Promise<Cart | undefined> => {
  const { cart } = (await baseRequest("GET", `users/${userId}/cart`)).data as {
    cart: Cart | undefined;
  };
  return cart;
};

/**
 * Update a user by id.
 * @param userId The user's id.
 * @param newUserFields The user's fields to update.
 * @returns A promise with the updated user.
 */
const updateUser = async (
  userId: string,
  newUserFields: Partial<User>
): Promise<User> => {
  const { user } = (
    await baseRequest("PATCH", `users/${userId}`, undefined, {
      userData: newUserFields,
    })
  ).data as { user: User };
  return user;
};

/**
 * Update a user's cart by their user id.
 * @param userId The user's id.
 * @param newCart The WHOLE new cart to put on the user.
 * @returns A promise with the updated cart.
 */
const updateUserCart = async (userId: string, newCart: Cart): Promise<Cart> => {
  const { cart } = (
    await baseRequest("PATCH", `users/${userId}/cart`, undefined, {
      newCart,
    })
  ).data as { cart: Cart };
  return cart;
};

// Users api methods
export const usersAPI = {
  createUser,
  getUser,
  getUserCart,
  updateUser,
  updateUserCart,
};
