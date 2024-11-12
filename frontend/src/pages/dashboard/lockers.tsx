// component imports
import { Button } from '@/components/ui/button'
import LockersGrid from '@/components/dashboard/lockers-grid'
import DashboardHeader from '@/components/dashboard/dashboard-header'

export default function Lockers() {
  return (
    <main className="flex h-full flex-col">
      <div className="flex justify-between mb-4">
        <DashboardHeader title="Lockers" />
        <ul className="flex gap-2">
          <li>
            <Button>All</Button>
          </li>
          <li>
            <Button>Avaliable</Button>
          </li>
          <li>
            <Button>Filled</Button>
          </li>
        </ul>
      </div>
      <LockersGrid />
    </main>
  )
}
