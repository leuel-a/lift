import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function AddMemberButton() {
  return (
    <Button className="bg-indigo-600 hover:bg-indigo-600/80" asChild>
      <Link to="/dashboard/members/add">Add Member</Link>
    </Button>
  )
}
