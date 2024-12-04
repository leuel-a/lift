import { getMonthName } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getMembersByMonth } from '@/services/analyticsService.ts'

// components
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  count: {
    label: 'Members',
    color: '#2563eb',
  },
} satisfies ChartConfig

export interface Props {
  year: number
}

export default function MembersByMonthChart({ year }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMembersCountByMonth', { year }],
    queryFn: getMembersByMonth,
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-indigo-600"></div>
      </div>
    )
  }

  if ((!data && !isLoading) || isError) {
    return <div>Something went wrong please try again</div>
  }

  if (!data) {
    return <div>Something went wrong please try again</div>
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data.map(({ month, count }) => {
          return {
            month: getMonthName(month),
            count,
          }
        })}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis dataKey="month" tickLine={false} tickMargin={0} axisLine={false} />
        <CartesianGrid stroke="#818cf8" strokeWidth={0.1} vertical={false} />
        <Bar dataKey="count" fill="#4f46e5" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
