import axios from '../plugins/axios';

export const fetchToken = ({
  email,
  password,
}) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/tokens',
      method: 'POST',
      data: {
        email,
        password,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const updateUser = ({
  email,
  password,
}, token) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/user',
      method: 'PATCH',
      data: {
        email,
        password,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const fetchSecrets = (token) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/secrets',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const storeSecret = ({
  name,
  ciphertext,
}, token) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/secrets',
      method: 'POST',
      data: {
        name,
        ciphertext,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const updateSecret = ({
  id,
  name,
  ciphertext,
}, token) => {
  return new Promise((res, rej) => {
    axios({
      url: `/api/secrets/${id}`,
      method: 'PATCH',
      data: {
        name,
        ciphertext,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const destroySecret = (id, token) => {
  return new Promise((res, rej) => {
    axios({
      url: `/api/secrets/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export default null;
