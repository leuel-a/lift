import { cleanEnv, str, port } from 'envalid'

const env = cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URI: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
})

export default env
