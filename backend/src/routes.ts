import { Router } from 'express'
import { registerUserSchema } from './schemas/users.schemas'
import validateResource from './middlewares/validateResource'
import { registerUserHandler } from './handlers/auth.handlers'

const router = Router()

router.post('/users', validateResource(registerUserSchema), registerUserHandler)

export default router
