//region component imports
import { Input } from '@/components/ui/input'

//endregion

export function FilterMembers() {
  return (
    <div>
      <Input
        className="w-96 border-indigo-200 text-indigo-950 focus-visible:ring-indigo-400"
        placeholder="Search by name..."
      />
      <div></div>
    </div>
  )
}
