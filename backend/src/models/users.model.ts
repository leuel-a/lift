import mongoose from 'mongoose'

export interface IUser extends Document {
  firstName?: string
  lastName?: string
  gender?: string
  phoneNumber?: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model<IUser>('User', UserSchema)
export default UserModel
