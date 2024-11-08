import { Router } from 'express'
import { registerUserSchema, loginUserSchema } from './schemas/auth.schemas'
import validateResource from './middlewares/validateResource'
import {
  registerUserHandler,
  loginUserHandler,
  getAuthenticatedUserHandler,
} from './handlers/auth.handlers'
import passport from 'passport'

const router = Router()

// auth route
router.post('/auth/register', validateResource(registerUserSchema), registerUserHandler)
router.post('/auth/login', validateResource(loginUserSchema), loginUserHandler)
router.get(
  '/auth/me',
  passport.authenticate('jwt', { session: false }),
  getAuthenticatedUserHandler,
)

export default router
