const QuillDeltaToHtmlConverter = require('quill-delta-to-html')
  .QuillDeltaToHtmlConverter;
const TOKEN_NAME = 'token';
const TOKEN_CART = 'cart';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);
export const getCartToken = () => {
  if (localStorage.getItem(TOKEN_CART)) {
    return JSON.parse(localStorage.getItem(TOKEN_CART));
  }
  return [];
};
export const setCartToken = (token) => {
  localStorage.setItem(TOKEN_CART, JSON.stringify(token));
};
export const isLengthValid = (string) => string.length < 20;

export const replaceInvalidWord = (string) => string.replaceAll(/\W/g, '').slice(0, 20);

export const isPhoneValid = (phone) => {
  const rule = /^09[\d]{8}$/;
  return rule.test(phone.toString());
};

export const isEmailValid = (email) => {
  const rule = /\w{1,}@\w{1,}\.\w{1,}[a-zA-Z]$/g;
  return rule.test(email);
};

export const isUsernameValid = (username) => {
  const rule = /\w{0,20}$/;
  return rule.test(username);
};

export const isColorChipValid = (ColorChip) => {
  const rule = /^[a-f0-9][a-f0-9]{5}$/;
  return rule.test(ColorChip);
};

export const isModelNameValid = (modelName) => {
  const rule = /^[A-Z]\w{0,14}-\w{4}$/;
  return rule.test(modelName);
};

export const isStorageValid = (store) => {
  const rule = /^[1-9]\d{0,2}$/;
  return rule.test(store);
};

export const isPriceValid = (price) => {
  const rule = /^[1-9]\d{0,4}$/;
  if (price > 29999) {
    return 1;
  }
  if (!rule.test(price)) {
    return 0;
  }

  return true;
};

export const isProductNameValid = (productName) => {
  const rule = /^[a-zA-Z]\w{0,15}$/;
  return rule.test(productName);
};

export const initFormErrorData = () => {
  return {
    username: { valid: true, message: '' },
    comfirmpassword: { valid: true, message: '' },
    realName: { valid: true, message: '' },
    email: { valid: true, message: '' },
    phone: { valid: true, message: '' },
  };
};

export const initRecipientFormErrorData = () => {
  return {
    address: { valid: true, message: '' },
    name: { valid: true, message: '' },
    email: { valid: true, message: '' },
    phone: { valid: true, message: '' },
  };
};

export const handleDateFormat = (date) => {
  const breakPoint = date.indexOf('T');
  return date.slice(0, breakPoint);
};

export const findOrder = (orders, id) => {
  return orders.filter((order) => order.id === id)[0];
};

export const getArticle = (data) => {
  const cfg = {};
  const deltaOps = JSON.parse(data).ops;
  const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
  return converter.convert();
};
