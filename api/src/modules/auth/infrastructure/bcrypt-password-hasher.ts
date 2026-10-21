import { config } from "#/config.js";
import type { PasswordHasher } from "../interfaces/password-hasher.js";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, config.security.bcrypt.salt);
  }

  async compare(data: string, encryptedData: string): Promise<boolean> {
    return bcrypt.compare(data, encryptedData);
  }
}
