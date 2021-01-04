import { getAuthToken } from './utils';
const BASE_URL = 'https://huiming.tw';

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
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
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
  return fetch(`${BASE_URL}/products?sort=${sort}&order=${order}&${type === 'all' ? '' : `type=${type}`}`, {
    method: 'GET',
    headers: { Authorization: authToken },
  }).then((res) => res.json());
};

export const getProduct = (id) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';

  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: { Authorization: authToken },
  }).then((res) => res.json());
};

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

export const updateProductStatus = ({ id, isShow }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ isShow: isShow === 1 ? 0 : 1 }),
  }).then((res) => res.json());
};

export const deleteProduct = (id) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';
  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: authToken,
    },
  }).then((res) => {
    if (res.status === 204) {
      console.log('刪除成功！！');
      return { success: true, message: '刪除成功！！' };
    }
    console.log('刪除失敗');
    return { success: false, message: '刪除失敗' };
  });
};

export const updateProduct = ({ id, productName, price, article, isShow, type }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;
  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ productName, price, article, isShow, type }),
  }).then((res) => res.json());
};

export const addProduct = ({ productName, price, article, type }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;
  console.log(productName, price, article, type);
  return fetch(`${BASE_URL}/products/`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ productName, price, article, type }),
  }).then((res) => res.json());
};

export const addProductPhoto = (file) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/photos`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
    },
    body: file,
  }).then((res) => res.json());
};

export const addArticlePhoto = (file) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/images`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
    },
    body: file,
  }).then((res) => res.json());
};

export const linkProductPhotos = ({ id, photos }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/photos`, {
    method: 'PATCH',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ productId: id, photos }),
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return {
        success:true,
        message:'新增成功'
      };
    }
    return {
      success:false,
      message:res.message.toString()
    };
  });
};

//model
export const getModel = (id) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';

  return fetch(`${BASE_URL}/models/${id}`, {
    method: 'GET',
    headers: { Authorization: authToken },
  }).then((res) => res.json());
};
export const deleteModel = (id) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';
  return fetch(`${BASE_URL}/models/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: authToken,
    },
  }).then((res) => {
    console.log('status Code', res.status);
    if (res.status === 204) {
      console.log('刪除成功！！');
      return { success: true, message: '刪除成功！！' };
    }
    console.log('刪除失敗');
    return { success: false, message: '刪除失敗' };
  });
};
export const updateModelStatus = ({ id, isShow }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/models/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ isShow: isShow === 1 ? 0 : 1 }),
  }).then((res) => res.json());
};
export const updateModel = ({ id, modelName, isShow, storage, colorChip }) => {
  const token = getAuthToken();
  const authToken = `Bearer ${token}`;

  return fetch(`${BASE_URL}/models/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: authToken,
      'content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ modelName, isShow, storage, colorChip }),
  }).then((res) => res.json());
};
export const addModel = ({ id, modelName, storage, colorChip }) => {
  const token = getAuthToken();
  const authToken = token ? `Bearer ${token}` : '';
  return fetch(`${BASE_URL}/models`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ productId: id, modelName, storage, colorChip }),
  }).then((res) => res.json());
};
