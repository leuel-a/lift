import LockerModel from '../models/lockers.model'
import MemberModel from '../models/members.model'

export interface LockerUsage {
  section: string
  isTaken: boolean
  count: number
}

/**
 * Aggregates locker usage data from the LockerModel.
 *
 * @returns A promise that resolves to an array of LockerUsage objects.
 */
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

export interface MonthMemberCount {
  year: number
  month: number
  count: number
}

/**
 * Aggregates member count data by month for a given year from the MemberModel.
 *
 * @param year - The year for which to aggregate member data.
 * @returns A promise that resolves to an array of MonthMemberCount objects.
 */
export const getMembersByMonth = async (year: number) => {
  return MemberModel.aggregate<MonthMemberCount>([
    {
      $match: {
        $expr: {
          $eq: [{ $year: '$membershipStartDate' }, year]
        }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: '$membershipStartDate' },
          year: { $year: '$membershipStartDate' }
        },
        count: { $sum: 1 }
      }
    }, {
      $project: {
        month: '$_id.month',
        year: '$_id.year',
        count: 1,
        _id: 0
      }
    }
  ])
}