import { LC_KEYS, SignupForm } from "../config/types";

const emailIsValid = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export const validateSignupForm = (form: SignupForm): string[] => {
  let errors: string[] = [];

  if (form.name.length === 0) {
    errors.push(`Field 'Name' must be filled`);
  }
  
  if (!emailIsValid(form.email)) {
    errors.push('Email is nor valid');
  }
  
  if (form.password.length === 0) {
    errors.push(`Field 'Password' must be filled`);
  }
  
  if (form.confirmPassword.length === 0) {
    errors.push(`Field 'Confirm password' must be filled`);
  }

  if (form.password.length < 8) {
    errors.push('Password must contain at least 8 characters');
  }

  const upperCaseRegex = /^(?=.*[A-Z])/;
  if (!upperCaseRegex.test(form.password)) {
    errors.push('Password must contain an upper case letter');
  }

  const lowerCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
  if (!lowerCaseRegex.test(form.password)) {
    errors.push('Password must contain an lower case letter');
  }

  const numberRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!numberRegex.test(form.password)) {
    errors.push('Password must contain a number');
  }

  const specialCharRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  if (!specialCharRegex.test(form.password)) {
    errors.push('Password must contain a special character');
  }

  const trailingRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  if (!trailingRegex.test(form.password)) {
    errors.push('Password must not contain a leading or trailing space');
  }
  
  if (form.password !== form.confirmPassword) {
    errors.push('Password do not match');
  }

  return errors;
}

export const isLoggedIn = (): {userId: string, token: string} | undefined => {
  const userId = localStorage.getItem(LC_KEYS.USER_ID);
  const token = localStorage.getItem(LC_KEYS.SESSION_TOKEN);

  if (!(userId && token)) {
    return undefined;
  }

  return {userId, token};
}