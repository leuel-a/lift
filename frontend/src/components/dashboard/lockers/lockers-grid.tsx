import type { Locker } from '@/types'
import LockersGridItem from '@/components/dashboard/lockers/lockers-grid-item.tsx'

interface LockersGridProps {
  lockers: Locker[]
}

export default function LockersGrid({ lockers }: LockersGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {lockers.map((locker) => (
        <LockersGridItem locker={locker} />
      ))}
    </div>
  )
}
