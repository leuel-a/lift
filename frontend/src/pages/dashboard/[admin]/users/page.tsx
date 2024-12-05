import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/services/usersService.ts'

import { columns } from './columns.tsx'
import DataTable from '@/components/dashboard/data-table'
import DataTablePagination from '@/components/dashboard/data-table-pagination.tsx'
import AddUserButton from '@/components/dashboard/[admin]/users/add-user-button.tsx'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading: isUsersLoading } = useQuery({
    queryKey: ['getUsers', { page, limit: 15 }],
    queryFn: fetchUsers,
  })

  if (isUsersLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-indigo-600"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-md lg:text-xl">Users</h2>
        <div className="flex gap-2">
          <AddUserButton />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {data && <DataTable columns={columns} data={data.data} />}
        {data && <DataTablePagination limit={data.limit} total={data.totalCount} page={data.page} setPage={setPage} />}
      </div>
    </>
  )
}