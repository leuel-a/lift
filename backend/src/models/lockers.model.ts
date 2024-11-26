import { model, Schema, Document } from 'mongoose'

interface ILocker {
  isTaken?: boolean
  lockerNumber: string
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
    lockerNumber: {
      type: String,
      required: true,
    },
    section: {
      enum: ['Male', 'Female'],
      type: String,
      required: true
    },
  },
  { timestamps: true },
)

const LockerModel = model<LockerDocument>('Locker', lockerSchema)
export default LockerModel
