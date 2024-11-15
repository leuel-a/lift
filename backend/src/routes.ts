import { Router } from 'express'
import { createMemberSchema, getMemberSchema, updateMemberSchema } from './schemas/members.schemas'
import { registerUserSchema, loginUserSchema } from './schemas/auth.schemas'
import validateResource from './middlewares/validateResource'
import {
  registerUserHandler,
  loginUserHandler,
  getAuthenticatedUserHandler,
} from './handlers/auth.handlers'
import passport from 'passport'
import {
  createMemberHandler,
  getManyMembersHandler,
  getMemberHandler,
  updateMemberHandler,
} from './handlers/members.handlers'

const router = Router()

// auth route
router.post('/auth/register', validateResource(registerUserSchema), registerUserHandler)
router.post('/auth/login', validateResource(loginUserSchema), loginUserHandler)
router.get(
  '/auth/me',
  passport.authenticate('jwt', { session: false }),
  getAuthenticatedUserHandler,
)

// members routes
router.post(
  '/members',
  validateResource(createMemberSchema),
  passport.authenticate('jwt', { session: false }),
  createMemberHandler,
)
router.get(
  '/members/:id',
  validateResource(getMemberSchema),
  passport.authenticate('jwt', { session: false }),
  getMemberHandler,
)
router.get('/members', passport.authenticate('jwt', { session: false }), getManyMembersHandler)
router.put(
  '/members/:id',
  validateResource(updateMemberSchema),
  passport.authenticate('jwt', { session: false }),
  updateMemberHandler,
)

export default router
