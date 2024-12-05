import { format, parseISO } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'

// components and types
import { type User } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} />
      </div>
    ),
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const Admin = (
        <div className="w-fit rounded-lg border border-indigo-950 bg-indigo-500 p-2 py-1 text-white">Admin</div>
      )
      const Employee = <div className="w-fit rounded-lg border border-lime-950 bg-gray-200 p-2 py-1">Employee</div>

      return (
        <div className="flex items-center justify-center">{row.getValue('role') === 'admin' ? Admin : Employee}</div>
      )
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => {
      const lastLogin = row.getValue('lastLogin') as string
      if (!lastLogin) {
        return <div className="text-yellow-700">User has not logged in yet</div>
      }

      const lastLoginDate = parseISO(lastLogin)
      return format(lastLoginDate, 'PPPpp')
    },
  },
]
