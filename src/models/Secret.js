import { decrypt } from '../helpers';

export default class Secret {
  constructor({
    id,
    name,
    ciphertext,
  }, key) {
    this.id = id;
    this.name = name;
    try {
      const { account, password } = JSON.parse(decrypt(ciphertext, key));
      this.account = account;
      this.password = password;
    } catch (e) {
      console.error(e);
    }
  }
}
