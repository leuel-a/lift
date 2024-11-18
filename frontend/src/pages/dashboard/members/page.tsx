import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMembers } from '@/services/membersService'

// components
import { columns } from './columns'
import MembersTable from './members-table'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import AddMemberButton from '@/components/dashboard/members/add-member-button'

export default function Page() {
  const [page] = useState(1)

  const { data, isLoading: isMembersLoading } = useQuery({
    queryKey: ['members', { page, limit: 20 }],
    queryFn: fetchMembers,
  })

  if (isMembersLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex justify-between">
        <DashboardHeader title="Members" />
        <div>
          {/* Search Input */}
          <AddMemberButton />
        </div>
      </div>
      <div className="mt-4">
        {data && <MembersTable columns={columns} data={data.data} />}
      </div>
    </>
  )
}
