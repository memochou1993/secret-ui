import axios from '../plugins/axios';

export const fetchToken = ({
  email,
  password,
}) => new Promise((res, rej) => {
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

export default {
  fetchToken,
};
