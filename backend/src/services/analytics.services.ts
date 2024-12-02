import LockerModel from '../models/lockers.model'

export interface LockerUsage {
  section: string
  isTaken: boolean
  count: number
}

export const checkLockersInUse = async () => {
  return LockerModel.aggregate<LockerUsage>([
    {
      $group: { _id: '$section', lockers: { $push: '$$ROOT' } }
    },
    { $unwind: '$lockers' },
    {
      $project: {
        section: '$_id',
        locker: '$lockers',
        _id: 0
      }
    },
    {
      $group: {
        _id: {
          section: '$section', isTaken: '$locker.isTaken'
        },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        section: '$_id.section',
        isTaken: '$_id.isTaken',
        count: 1,
        _id: 0
      }
    }
  ])
}