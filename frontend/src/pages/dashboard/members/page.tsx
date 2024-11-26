import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMembers } from '@/services/membersService'

// components
import { columns } from './columns'
import MembersTable from './members-table'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import AddMemberButton from '@/components/dashboard/members/add-member-button'
import MembersPagination from '@/components/dashboard/members/member-pagination'
import { FilterMembers } from '@/components/dashboard/members/filter-members'

export default function Page() {
  const [page, setPage] = useState(1)

  const { data, isLoading: isMembersLoading } = useQuery({
    queryKey: ['getMembers', { page, limit: 15 }],
    queryFn: fetchMembers,
  })

  // TODO: change the logic to return the data if the members is not there
  if (isMembersLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex justify-between">
        <DashboardHeader title="Members" />
        <div className="flex gap-2">
          {/* Filter Members, by search and toggling */}
          <FilterMembers />
          <AddMemberButton />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {data && <MembersTable columns={columns} data={data.data} />}
        {data && (
          <MembersPagination
            limit={data.limit}
            total={data.totalCount}
            page={data.page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  )
}
