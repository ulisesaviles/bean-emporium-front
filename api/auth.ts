import { Auth } from 'aws-amplify';

export const login = async (email: string, password: string) => {
  try {
    const user = await Auth.signIn(email, password);
    const accessToken = user.signInUserSession.accessToken.jwtToken;
    return accessToken;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    await Auth.signUp({
      username: email,
      password,
    });
    return true;
  } catch (error) {
    console.log('Signup error:', error);
    throw error;
  }
};
