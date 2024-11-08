import bcrypt from 'bcrypt'

import env from '../utils/env'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

export const validatePassword = (hash: string, candidate: string) => {
  return bcrypt.compare(candidate, hash)
}
