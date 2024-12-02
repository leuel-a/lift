import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'

// components and types
import { Member } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Member>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} />
    ),
    enableSorting: true,
    enableHiding: true,
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
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'membershipStartDate',
    header: 'Start Date',
    cell: ({ row }) => <div>{format(row.getValue('membershipStartDate'), 'PPP')}</div>,
  },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.getValue('active') as boolean
      return (
        <div
          className={cn(
            'inline-flex select-none justify-center rounded-lg px-2 py-1 text-[0.75rem] font-medium text-white',
            active ? 'bg-indigo-600/90' : '',
          )}
        >
          {active ? 'Active' : 'In-active'}
        </div>
      )
    },
  },
]
