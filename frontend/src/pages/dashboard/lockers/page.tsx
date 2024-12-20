import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchLockers } from '@/services/lockersService.ts'

// component imports
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import LockersGrid from '@/components/dashboard/lockers/lockers-grid.tsx'
import SectionSelector from '@/components/dashboard/lockers/section-selector.tsx'

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams()

  const isTaken = searchParams.get('isTaken') || ''
  const section = searchParams.get('section') || 'Male'

  const { data: lockers, isLoading: isLockersLoading } = useQuery({
    queryKey: ['getLockers', { section, isTaken }],
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
          <Button
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set('isTaken', '')

              setSearchParams(params)
            }}
            variant={isTaken === '' ? 'outline' : 'ghost'}
            className={cn(isTaken === '' ? 'border-indigo-950/80 bg-indigo-100 hover:bg-indigo-200/80' : '')}
          >
            All
          </Button>
          <Button
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set('isTaken', 'false')

              setSearchParams(params)
            }}
            className={cn(isTaken === 'false' && 'bg-teal-600 hover:bg-teal-600/80')}
            variant={isTaken === 'false' ? 'default' : 'outline'}
          >
            Free
          </Button>
          <Button
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set('isTaken', 'true')

              setSearchParams(params)
            }}
            className={cn(isTaken === 'true' && 'bg-indigo-600 hover:bg-indigo-700/80')}
            variant={isTaken === 'true' ? 'default' : 'outline'}
          >
            Taken
          </Button>
        </div>
      </div>
      {lockers && <LockersGrid lockers={lockers} />}
      {isLockersLoading && (
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {Array.from({ length: 50 }).map(() => {
            return <Skeleton className="h-20 lg:h-24" />
          })}
        </div>
      )}
    </main>
  )
}
