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

export const fetchWebAuthnRegisterOptions = (token) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/webauthn/register/begin',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const finishWebAuthnRegister = (body, token) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/webauthn/register/finish',
      method: 'POST',
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const fetchWebAuthnLoginOptions = () => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/webauthn/login/begin',
      method: 'POST',
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const finishWebAuthnLogin = (body) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/webauthn/login/finish',
      method: 'POST',
      data: body,
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export default null;
