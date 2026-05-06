import CryptoJS from 'crypto-js';

const { subtle } = window.crypto;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const PBKDF2_ITERATIONS = 600000;
const VERSION_PREFIX = 'v2$';
const IV_BYTES = 12;

export const delay = (ms) => {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
};

const toBase64 = (bytes) => {
  const u8 = new Uint8Array(bytes);
  let binary = '';
  for (let i = 0; i < u8.length; i += 1) {
    binary += String.fromCharCode(u8[i]);
  }
  return btoa(binary);
};

const fromBase64 = (str) => {
  const binary = atob(str);
  const u8 = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    u8[i] = binary.charCodeAt(i);
  }
  return u8;
};

// SHA256 hex of password. Kept only for decrypting legacy ciphertexts.
export const legacyHash = (text) => {
  return CryptoJS.SHA256(text).toString();
};

// Derive a non-extractable AES-GCM CryptoKey from password + email-as-salt.
export const deriveKey = async (password, email) => {
  const baseKey = await subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(email.trim().toLowerCase()),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
};

// `current` is for AES-GCM v2 reads/writes; `legacy` is the SHA256 hex used by
// CryptoJS for decrypting pre-v2 ciphertexts.
export const buildKeys = async (password, email) => ({
  legacy: legacyHash(password),
  current: await deriveKey(password, email),
});

export const isLegacy = (ciphertext) => {
  return typeof ciphertext === 'string' && !ciphertext.startsWith(VERSION_PREFIX);
};

export const encrypt = async (plaintext, keys) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const ciphertext = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    keys.current,
    encoder.encode(plaintext),
  );
  const out = new Uint8Array(IV_BYTES + ciphertext.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ciphertext), IV_BYTES);
  return `${VERSION_PREFIX}${toBase64(out)}`;
};

export const decrypt = async (ciphertext, keys) => {
  if (typeof ciphertext === 'string' && ciphertext.startsWith(VERSION_PREFIX)) {
    const bytes = fromBase64(ciphertext.slice(VERSION_PREFIX.length));
    const iv = bytes.slice(0, IV_BYTES);
    const data = bytes.slice(IV_BYTES);
    const plaintext = await subtle.decrypt(
      { name: 'AES-GCM', iv },
      keys.current,
      data,
    );
    return decoder.decode(plaintext);
  }
  return CryptoJS.AES.decrypt(ciphertext, keys.legacy).toString(CryptoJS.enc.Utf8);
};

export default null;
