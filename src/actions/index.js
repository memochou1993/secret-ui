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

export default null;
