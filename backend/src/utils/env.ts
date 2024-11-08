import { cleanEnv, str, port, num } from 'envalid'

const env = cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URI: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  BCRYPT_SALT_ROUNDS: num({ default: 10 }),
  JWT_SECRET: str(),
  ACCESS_TOKEN_TTL: str(),
  REFRESH_TOKEN_TTL: str(),
})

export default env
