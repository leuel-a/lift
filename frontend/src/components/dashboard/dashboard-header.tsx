import { cn } from '@/lib/utils'

export interface DashboardHeaderProps {
  title: string
  className?: string
}

export default function DashboardHeader({
  title,
  className,
}: DashboardHeaderProps) {
  return <h1 className={cn('text-2xl font-semibold', className)}>{title}</h1>
}
