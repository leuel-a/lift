import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function AddUserButton() {
  return (
    <Button className="h-full bg-indigo-600 hover:bg-indigo-600/80">
      <Link to="/dashboard/users/add">Add User</Link>
    </Button>
  )
}
