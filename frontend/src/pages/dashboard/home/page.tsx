import { useAuth } from '@/hooks/use-auth'
import MembersByMonthChart from '@/components/dashboard/home/MembersByMonthChart.tsx'

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
      <div className="flex gap-8">
        <div className="flex-1 rounded-lg shadow-md">
          <MembersByMonthChart year={2024} />
        </div>
        <div className="flex-1 rounded-lg shadow-md"></div>
      </div>
    </div>
  )
}
