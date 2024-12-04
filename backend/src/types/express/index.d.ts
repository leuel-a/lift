import { IUser } from '../../models/users.model'

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
