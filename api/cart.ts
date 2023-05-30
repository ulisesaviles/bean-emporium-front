// Base API request
import { Cart, LC_KEYS, Product } from "@/app/config/types";
import { baseRequest } from "./config";

import { isLoggedIn } from "@/app/helpers/auth.helper";
import { usersAPI } from "./users";
import { useId } from "react";

const getCart = async () => {
  try {
    const res = isLoggedIn();
    if (res) {
      const {userId, token} = res;
      const {cart} = (await baseRequest('GET', `users/${userId}/cart`, undefined, undefined, true)).data;
      return cart;
    }
    else {
      throw new Error('User is not logged in');
    }
  }
  catch(error) {
    throw error;
  }
}

const addProductToCart = async (product: any) => {
  try {
    const res = isLoggedIn();

    if (res) {
      const {userId, token} = res;
      let cart = await getCart();
  
      cart = [...cart, product];

      
      const user = await usersAPI.updateUser(userId, {cart});
      localStorage.setItem(LC_KEYS.CART, JSON.stringify(cart));

      return user.cart;
    }
    else {
      throw new Error('User is not authenticated.');
    }
  }
  catch(error) {
    throw error;
  }
}

const updateCart = async(cart: Cart) => {
  try {
    const res = isLoggedIn();

    if (res) {
      const {userId, token} = res;

      const user = await usersAPI.updateUser(userId, {cart});

      localStorage.setItem(LC_KEYS.CART, JSON.stringify(cart));

      return user.cart;
    }
  }
  catch(error) {
    console.log(error);
  }
}

export const cartAPI = {
  getCart,
  addProductToCart,
  updateCart
};