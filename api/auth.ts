import { LC_KEYS } from '@/app/config/types';
import { Auth } from 'aws-amplify';
import { usersAPI } from './users';

export const login = async (email: string, password: string): Promise<{userId: string, token: string}> => {
  try {
    const res = await Auth.signIn(email, password);
    const userId = res.attributes.sub;
    const token = res.signInUserSession.accessToken.jwtToken;

    localStorage.setItem(LC_KEYS.USER_ID, userId);
    localStorage.setItem(LC_KEYS.SESSION_TOKEN, token);
    localStorage.setItem(LC_KEYS.CART, JSON.stringify([]));

    return {userId, token};
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const res = await Auth.signUp({
      username: email,
      password,
      attributes: {name}
    });

    await usersAPI.createUser(res.userSub, name, email);
    return {name, email, password, userId: res.userSub};
  } catch (error) {
    console.log('Signup error:', error);
    throw error;
  }
};
