import CryptoJS from 'crypto-js';

export const delay = (delay) => {
  return new Promise((res) => {
    setTimeout(() => res(), delay);
  });
};

export const hash = (text) => {
  return CryptoJS.SHA256(text).toString();
};

export const encrypt = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (text, key) => {
  return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
};

export default null;
