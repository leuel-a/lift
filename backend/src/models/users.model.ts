import mongoose from 'mongoose'

export interface IUser {
  firstName?: string
  lastName?: string
  gender?: string
  phoneNumber?: string
  email: string
  role: string
  password: string
}

export interface UserDocument extends IUser, Document {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee']
  }
})

const UserModel = mongoose.model<UserDocument>('User', UserSchema)
export default UserModel
