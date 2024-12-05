import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMembers } from '@/services/membersService'

// components
import { columns } from './columns'
import DataTable from '@/components/dashboard/data-table.tsx'
import AddMemberButton from '@/components/dashboard/members/add-member-button'
import DataTablePagination from '@/components/dashboard/data-table-pagination.tsx'
import { FilterMembers } from '@/components/dashboard/members/filter-members'

export default function Page() {
  const [page, setPage] = useState(1)

  const { data, isLoading: isMembersLoading } = useQuery({
    queryKey: ['getMembers', { page, limit: 15 }],
    queryFn: fetchMembers,
  })

  if (isMembersLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-indigo-600"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-md lg:text-xl">Members</h2>
        <div className="flex gap-2">
          <FilterMembers />
          <AddMemberButton />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {data && <DataTable columns={columns} data={data.data} />}
        {data && <DataTablePagination limit={data.limit} total={data.totalCount} page={data.page} setPage={setPage} />}
      </div>
    </>
  )
}
