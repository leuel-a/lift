import { useAuth } from '@/hooks/use-auth'
import MembersByMonthChart from '@/components/dashboard/home/MembersByMonthChart'
import MembershipYearSelector from '@/components/dashboard/home/MembershipYearSelector'

export default function DashboardHome() {
  const { user, isLoading, isError } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-indigo-600"></div>
      </div>
    )
  }

  if ((!isLoading && !user) || isError) {
    return <div>Something went wrong please refresh the page</div>
  }
  return (
    <div>
      <div className="mb-4">
        <h1 className="space-x-2 text-lg">
          Welcome Back
          {user && (
            <span className="ml-2 font-medium text-indigo-950">
              {user.firstName} {user.lastName}
            </span>
          )}
        </h1>
      </div>
      <div>
        <div className="flex gap-8">
          <div className="flex-1 rounded-lg border border-gray-200 px-4 py-5 shadow-md">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">Memberships</h3>
              <div>
                <MembershipYearSelector />
              </div>
            </div>
            {/*TODO: chart type for the membership visualizer*/}
            <MembersByMonthChart year={2024} />
          </div>
          <div className="flex-1 rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  )
}
