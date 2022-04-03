import { decrypt } from '../helpers';

export default class Secret {
  constructor({
    id,
    name,
    ciphertext,
  }, key) {
    const { account, password } = JSON.parse(decrypt(ciphertext, key));
    this.id = id;
    this.name = name;
    this.account = account;
    this.password = password;
  }
}
