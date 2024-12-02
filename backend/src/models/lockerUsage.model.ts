import mongoose from 'mongoose'

export interface ILockerUsage {
  maleTakenCount: number
  femaleTakenCount: number
  collectedAt?: Date
}

export interface LockerUsageDocument extends mongoose.Document, ILockerUsage {
  createdAt: Date
  updatedAt: Date
}

const lockerUsageSchema = new mongoose.Schema({
  maleTakenCount: { type: Number, required: true },
  femaleTakenCount: { type: Number, required: true },
  collectedAt: { type: Date, required: false, default: Date.now() }
}, { timestamps: true })

const LockerUsageModel = mongoose.model<LockerUsageDocument>('LockerUsage', lockerUsageSchema)
export default LockerUsageModel