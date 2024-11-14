import { useQuery } from '@tanstack/react-query'
import { fetchMembers } from '@/services/membersService'

// components
import { columns } from './columns'
import MembersTable from './members-table'
import DashboardHeader from '@/components/dashboard/dashboard-header'

export default function Page() {
  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
  })

  if (isMembersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <DashboardHeader title="Members" />
      <div className='mt-4'>
        <MembersTable columns={columns} data={members || []} />
      </div>
    </div>
  )
}
