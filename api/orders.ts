// Base API request
import { Order } from "@/app/config/types";
import { baseRequest } from "./config";

import { isLoggedIn } from "@/app/helpers/auth.helper";

const getOrders = async (): Promise<Order[]> => {
  try {
    const res = isLoggedIn();
    if (res) {
      const {userId, token} = res;
      const {orders} = (await baseRequest('GET', `orders`, {search: userId}, undefined, true)).data;
      return orders;
    }
    else {
      throw new Error('User is not logged in');
    }
  }
  catch(error) {
    throw error;
  }
}

const getOrder = async(id: string) => {
  try {
    const res = isLoggedIn();

    if (res) {
      const {userId, token} = res;

      const {order} = (await baseRequest('GET', `orders/${id}`, undefined, undefined, true)).data;
      return order;
    }
  }
  catch(error) {
    console.log(error);
  }
}

const createOrder = async(order: Order) => {
  try {
    const res = isLoggedIn();

    if (res) {
      const {userId, token} = res;
      
      const {newOrder} = (await baseRequest('POST', `orders`, undefined, {order}, true)).data;
      return newOrder;
    }
  }
  catch(error) {
    console.log(error);
  }
}

export const ordersAPI = {
  getOrder,
  getOrders,
  createOrder
};