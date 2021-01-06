const TOKEN_NAME = 'token';
<<<<<<< HEAD
const TOKEN_CART = 'cart';
=======
const TOKEN_ORDER = 'order';
>>>>>>> 95daf9dc5b0253b8e95460101467f9b5144069e6

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


export const setOrderList = (token) => {
  localStorage.setItem(TOKEN_ORDER, token);
};

export const getOrderList = () => localStorage.getItem(TOKEN_ORDER);

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
  const rule = /\w{0,20}/;
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
  return true
};

export const isProductNameValid = (productName) => {
  const rule = /^[a-zA-Z]\w{0,15}$/;
  return rule.test(productName);
};

export const initFormErrorData = () => {
  return {
    comfirmpassword: { valid: true, message: '' },
    realName: { valid: true, message: '' },
    email: { valid: true, message: '' },
    phone: { valid: true, message: '' },
  };
};

export const handleDateFormat = (date) => {
  const breakPoint = date.indexOf('T');
  return date.slice(0, breakPoint);
};

export const handleOrderStatus = (status) => {
  switch (status) {
    case 1:
      return '處理中';
    case 2:
      return '已出貨';
    default:
      return '未付款';
  }
};
export const findOrder = (orders, id) => {
  return orders.filter((order) => order.id === id)[0];
};
