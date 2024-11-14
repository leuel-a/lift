import { Schema, model, Document } from 'mongoose'

export interface IMember {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  membershipType: 'monthly' | 'quarterly' | 'yearly'
  membershipStartDate: Date
  membershipValidUntil?: Date
  active?: boolean
}

export interface MemberDocument extends Document, IMember {
  createdAt: Date
  updatedAt: Date
}

const memberSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    membershipType: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly'],
    },
    membershipStartDate: Date,
    membershipValidUntil: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true },
)

const MemberModel = model<MemberDocument>('Member', memberSchema)
export default MemberModel
