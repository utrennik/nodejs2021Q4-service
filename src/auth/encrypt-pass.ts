import bcrypt from 'bcryptjs';
import config from '../common/config';

/**
 * Encrypts given string
 * @param createUserDto CreateUserDto
 * @returns encrypted string (promise)
 */
const encryptPass = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(config.CRYPT_SALT);

  const encryptedPass = await bcrypt.hash(pass, salt);

  return encryptedPass;
};

export default encryptPass;
