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
    header: 'Active',
    cell: ({ row }) => {
      const active = row.getValue('active') as boolean
      return <div className={cn('inline-flex justify-center text-white px-2 py-1 text-[0.75rem] font-medium rounded-lg',active ? 'bg-indigo-600/70': '')}>{active ? 'Active' : 'In-active'}</div>
    },
  },
]
