import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'

// components and types
import { Member } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Member>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
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
    accessorKey: 'membershipStartDate',
    header: 'Start Date',
    // TODO: format the date to make it more readable
    cell: ({ row }) => (
      <div>{format(row.getValue('membershipStartDate'), 'PPP')}</div>
    ),
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      const text = row.getValue('active') ? 'Active' : 'Not Active'
      return (
        <Badge
          className={cn(
            'select-none',
            row.getValue('active') === false &&
              'bg-slate-500 hover:bg-slate-500/80',
          )}
        >
          {text}
        </Badge>
      )
    },
  },
]
