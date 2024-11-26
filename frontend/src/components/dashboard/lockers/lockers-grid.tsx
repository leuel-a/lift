import LockersGridItem from '@/components/dashboard/lockers/lockers-grid-item.tsx'

const LOCKERS_COUNT = 50

export default function LockersGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-3">
      {Array.from({ length: LOCKERS_COUNT }).map(() => (
        <LockersGridItem />
      ))}
    </div>
  )
}
