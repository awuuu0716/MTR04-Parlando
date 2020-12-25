const TOKEN_NAME = 'token';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);

export const isLengthValid = (string) => string.length < 20;

export const replaceInvalidWord = (string) =>
  string.replaceAll(/\W/g, '').slice(0, 20);

export const isPhoneValid = (phone) => {
  const rule = /^09[\d]{8}$/;
  return rule.test(phone.toString());
};

export const isEmailValid = (email) => {
  const rule = /\w{1,}@\w{1,}\.\w{1,}[a-zA-Z]$/g;
  return rule.test(email);
};

export const isUsernameValid = (username) => {
  const rule = /\w{0,20}/;
  return rule.test(username);
};

export const initFormErrorData = () => {
  return {
    comfirmpassword: { valid: true, message: '' },
    realName: { valid: true, message: '' },
    email: { valid: true, message: '' },
    phone: { valid: true, message: '' },
  };
};