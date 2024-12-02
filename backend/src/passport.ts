import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from 'passport-jwt'

import env from './utils/env'
import { findUserById } from './services/users.services'

const options: StrategyOptionsWithoutRequest = {
  secretOrKey: env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await findUserById(payload.sub as string)
      if (!user) {
        done(null, false)
        return
      }

      done(null, user)
      return
    } catch (error) {
      done(error, null)
      return
    }
  }),
)
