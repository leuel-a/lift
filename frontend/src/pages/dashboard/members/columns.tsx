import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

// components and types
import { Member } from '@/types'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Member>[] = [
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
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      const text = row.getValue('active') ? 'Active' : 'Not Active'
      return <Badge className={cn(row.getValue('active') === false && 'bg-slate-500')}>{text}</Badge>
    },
  },
]
