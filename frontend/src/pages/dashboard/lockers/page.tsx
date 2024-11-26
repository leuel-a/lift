import { useState } from 'react'

// component imports
import { Button } from '@/components/ui/button'
import LockersGrid from '@/components/dashboard/lockers/lockers-grid.tsx'
import SectionSelector from '@/components/dashboard/lockers/section-selector.tsx'

export default function Page() {
  const [filter, setFilter] = useState('')
  const [section, setSection] = useState<string>('Male')

  return (
    <main className="flex h-full flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h2 className="text-md lg:text-xl">
            <span className="font-medium">{section}</span> Lockers
          </h2>
          <SectionSelector section={section} setSection={setSection} />
        </div>
        <div className="flex gap-2">
          <Button>All</Button>
          <Button variant={filter === 'free' ? 'default' : 'outline'}>Free</Button>
          <Button variant={filter === 'taken' ? 'default' : 'outline'}>Taken</Button>
        </div>
      </div>
      <LockersGrid />
    </main>
  )
}
