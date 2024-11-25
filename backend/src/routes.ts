import { Router } from 'express'
import {
  createMemberSchema,
  getManyMembersSchema,
  getMemberSchema,
  updateMemberSchema,
} from './schemas/members.schemas'
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
import {
  assignLockerHandler,
  freeLockerHandler,
  getManyLockerHandler,
} from './handlers/lockers.handlers'

const router = Router()

//#region auth routes
router.post('/auth/register', validateResource(registerUserSchema), registerUserHandler)
router.post('/auth/login', validateResource(loginUserSchema), loginUserHandler)
router.get(
  '/auth/me',
  passport.authenticate('jwt', { session: false }),
  getAuthenticatedUserHandler,
)
//#endregion

//#region members routes
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
router.get(
  '/members',
  validateResource(getManyMembersSchema),
  passport.authenticate('jwt', { session: false }),
  getManyMembersHandler,
)
router.put(
  '/members/:id',
  validateResource(updateMemberSchema),
  passport.authenticate('jwt', { session: false }),
  updateMemberHandler,
)
//#endregion

//#region lockers routes
router.get('/lockers', passport.authenticate('jwt', { session: false }), getManyLockerHandler)
router.post(
  '/lockers/:id/assign',
  passport.authenticate('jwt', { session: false }),
  assignLockerHandler,
)
router.post(
  '/lockers/:id/free',
  passport.authenticate('jwt', { session: false }),
  freeLockerHandler,
)
//#endregion

export default router
