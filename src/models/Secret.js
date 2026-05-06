import { decrypt } from '../helpers';

export default class Secret {
  constructor() {
    this.id = null;
    this.name = '';
    this.account = '';
    this.password = '';
  }

  static async from(data, key) {
    const secret = new Secret();
    secret.id = data.id;
    secret.name = data.name;
    try {
      const { account, password } = JSON.parse(await decrypt(data.ciphertext, key));
      secret.account = account;
      secret.password = password;
    } catch (e) {
      console.error(e);
    }
    return secret;
  }
}
