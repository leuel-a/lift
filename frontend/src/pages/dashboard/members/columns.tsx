import { Member } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

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
  },
]
