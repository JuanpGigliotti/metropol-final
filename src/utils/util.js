import bcrypt from 'bcrypt';

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const compareHash = (password, user) => bcrypt.compareSync(password, user.password);

export { createHash, compareHash };