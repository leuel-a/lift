import { model, Schema, Document } from 'mongoose'

interface ILocker {
  isTaken?: boolean
  section: "Male" | "Female"
}

export interface LockerDocument extends ILocker, Document {
  createdAt: Date
  updatedAt: Date
}

const lockerSchema = new Schema(
  {
    isTaken: {
      type: Boolean,
      required: false,
      default: false,
    },
    section: {
      enum: ['Male', 'Female'],
      type: String,
      required: true
    },
  },
  { timestamps: true },
)

const LockerModel = model('Locker', lockerSchema)
export default LockerModel
