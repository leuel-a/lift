import { Router } from 'express'
import {
  createMemberSchema,
  getManyMembersSchema,
  getMemberSchema,
  updateMemberSchema,
} from './schemas/members.schemas'
import { registerUserSchema, loginUserSchema, updateUserSchema } from './schemas/users.schemas'
import validateResource from './middlewares/validateResource'
import {
  registerUserHandler,
  loginUserHandler,
  getAuthenticatedUserHandler,
} from './handlers/auth.handlers'
import { updateUserHandler } from './handlers/users.handlers'
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
  getSingleLockerHandler
} from './handlers/lockers.handlers'
import {
  freeLockerSchema,
  assignLockerSchema,
  getManyLockersSchema,
  getSingleLockerSchema
} from './schemas/lockers.schemas'
import { requireAdmin } from './middlewares/requireAdmin'
import { getMembersByMonthSchema } from './schemas/analytics.schemas'
import { getMembersByMonthHandler } from './handlers/analytics.handlers'

const router = Router()

//#region auth routes
router.post('/auth/register', validateResource(registerUserSchema), passport.authenticate('jwt', { session: false }), requireAdmin, registerUserHandler)
router.post('/auth/login', validateResource(loginUserSchema), loginUserHandler)
router.get(
  '/auth/me',
  passport.authenticate('jwt', { session: false }),
  getAuthenticatedUserHandler,
)

//#endregion

//region users routes
router.put('/users/:id', validateResource(updateUserSchema), passport.authenticate('jwt', { session: false }), requireAdmin, updateUserHandler)

//endregion

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
router.get(
  '/lockers',
  validateResource(getManyLockersSchema),
  passport.authenticate('jwt', { session: false }),
  getManyLockerHandler,
)
router.put(
  '/lockers/:id/assign',
  validateResource(assignLockerSchema),
  passport.authenticate('jwt', { session: false }),
  assignLockerHandler,
)
router.get('/lockers/:id', validateResource(getSingleLockerSchema), passport.authenticate('jwt', { session: false }), getSingleLockerHandler)
router.put('/lockers/:id/free', validateResource(freeLockerSchema), passport.authenticate('jwt', { session: false }), freeLockerHandler)

//#endregion

//region analytics routes
router.get('/analytics/members/:year', validateResource(getMembersByMonthSchema), passport.authenticate('jwt', { session: false }), getMembersByMonthHandler)

//endregion

export default router
