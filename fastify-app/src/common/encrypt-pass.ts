import bcrypt from 'bcrypt';

const encryptPass = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  const encryptedPass = await bcrypt.hash(pass, salt);

  return encryptedPass;
};

export default encryptPass;
