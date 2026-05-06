import { decrypt } from '../helpers';

export default class Secret {
  constructor() {
    this.id = null;
    this.name = '';
    this.account = '';
    this.password = '';
    this.ciphertext = '';
  }

  static async from(data, keys) {
    const secret = new Secret();
    secret.id = data.id;
    secret.name = data.name;
    secret.ciphertext = data.ciphertext;
    try {
      const { account, password } = JSON.parse(await decrypt(data.ciphertext, keys));
      secret.account = account;
      secret.password = password;
    } catch (e) {
      console.error(e);
    }
    return secret;
  }
}
