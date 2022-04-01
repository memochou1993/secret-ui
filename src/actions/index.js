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

export const fetchSecrets = () => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/secrets',
      method: 'GET',
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const storeSecret = ({
  username,
  password,
  tags,
}) => {
  return new Promise((res, rej) => {
    axios({
      url: '/api/secrets',
      method: 'POST',
      data: {
        username,
        password,
        tags,
      },
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export const destroySecret = (id) => {
  return new Promise((res, rej) => {
    axios({
      url: `/api/secrets/${id}`,
      method: 'DELETE',
    })
      .then(({ data }) => res(data))
      .catch((e) => rej(e));
  });
};

export default null;
