import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function AddMemberButton() {
  return (
    <Button asChild>
      <Link to='/dashboard/members/add'>Add Member</Link>
    </Button>
  )
}
