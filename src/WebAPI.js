import { getAuthToken } from './utils';
const BASE_URL = 'https://parlando.tw';

// users
export const signUp = ({ username, password, realName, email, phone }) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ username, password, realName, email, phone }),
  }).then((res) => res.json());

export const login = ({ username, password }) =>
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => {
    return res.json();
  });

export const adminLogin = ({ username, password }) =>
  fetch(`${BASE_URL}/admin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => {
    return res.json();
  });

export const getMemberInfo = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

export const updateUserData = ({ realName, email, phone }) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ realName, email, phone }),
  }).then((res) => res.json());
};

// products
export const getProducts = ({ type, sort, order }) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';

  return fetch(
    `${BASE_URL}/products?sort=${sort}&order=${order}&${
      type === 'all' ? '' : `type=${type}`
    }`,
    {
      method: 'GET',
      headers: { Authorization: authToken },
    }
  ).then((res) => res.json());
};

export const getProduct = (uuid) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';

  return fetch(`${BASE_URL}/products/${uuid}`, {
    method: 'GET',
    headers: { Authorization: authToken },
  }).then((res) => res.json());
};

// orders

export const getOrders = () => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
};

export const getOrder = (id) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/orders/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
};