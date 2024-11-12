import { useState } from 'react'
import LockersGridItem from './lockers-grid-item'

// constants

export default function LockersGrid() {
  const [lockerCount] = useState(10)
  return (
    <div className="grid grid-flow-dense grid-cols-8 gap-2">
      {Array.from({ length: lockerCount }).map((_, index) => (
        <LockersGridItem key={index} />
      ))}
    </div>
  )
}
