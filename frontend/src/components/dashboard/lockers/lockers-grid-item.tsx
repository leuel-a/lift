import { cn } from '@/lib/utils'
import type { Locker } from '@/types'

// components
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignLocker, freeLocker } from '@/services/lockersService.ts'

interface LockersGridItemProps {
  locker: Locker
}

export default function LockersGridItem({ locker: { _id: id, lockerNumber, isTaken } }: LockersGridItemProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // mutations
  const { mutate: assignLockerMutation } = useMutation({
    mutationFn: assignLocker,
    mutationKey: ['assignLocker', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getLockers'] })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Locker not assigned, Something went wrong',
      })
    },
  })

  const { mutate: freeLockerMutation } = useMutation({
    mutationFn: freeLocker,
    mutationKey: ['freeLocker', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getLockers'] })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Locker not freed, Something went wrong',
      })
    },
  })

  return (
    <div className="shadom-lg flex h-20 flex-col justify-between rounded-md p-2 shadow outline outline-1 outline-gray-300 lg:h-24">
      <div>
        <p className="text-gray-700">{lockerNumber}</p>
      </div>
      <div className="flex justify-end">
        <Badge
          onClick={() => {
            if (isTaken) {
              freeLockerMutation({ id })
            } else {
              assignLockerMutation({ id })
            }
          }}
          className={cn(
            'cursor-pointer',
            isTaken ? 'bg-indigo-950/80 hover:bg-indigo-950/60' : 'bg-teal-600 hover:bg-teal-600/80',
          )}
        >
          {isTaken ? 'taken' : 'free'}
        </Badge>
      </div>
    </div>
  )
}
