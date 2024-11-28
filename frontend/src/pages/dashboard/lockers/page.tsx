import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchLockers } from '@/services/lockersService.ts'

// component imports
import { Button } from '@/components/ui/button'
import LockersGrid from '@/components/dashboard/lockers/lockers-grid.tsx'
import SectionSelector from '@/components/dashboard/lockers/section-selector.tsx'

export default function Page() {
  const [searchParams] = useSearchParams()
  const section = searchParams.get('section') || 'Male'

  const { data: lockers } = useQuery({
    queryKey: ['getLockers', { section }],
    queryFn: fetchLockers,
  })

  return (
    <main className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h2 className="text-md lg:text-xl">
            <span className="font-medium">{section}</span> Lockers
          </h2>
          <SectionSelector />
        </div>
        <div className="flex gap-2">
          <Button>All</Button>
          <Button variant={'outline'}>Free</Button>
          <Button variant={'outline'}>Taken</Button>
        </div>
      </div>
      {lockers && <LockersGrid lockers={lockers} />}
    </main>
  )
}
