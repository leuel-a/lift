import { getAuthenticatedUser } from '@/services/authService'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['getAuthenticatedUser'],
    queryFn: getAuthenticatedUser,
  })
  return { user, isLoading, isError, error }
}
