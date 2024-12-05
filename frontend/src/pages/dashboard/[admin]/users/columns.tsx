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
  { accessorKey: 'role', header: 'Role' },
]
