import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Dispatch, SetStateAction } from 'react'

interface MembersPaginationProps {
  limit: number
  page: number
  total: number
  setPage: Dispatch<SetStateAction<number>>
}

export default function MembersPagination({
  page,
  total,
  limit,
  setPage,
}: MembersPaginationProps) {
  const previousPage = page - 1 > 0 ? page - 1 : undefined
  const nextPage = total / limit - page > 0 ? page + 1 : undefined

  return (
    <Pagination>
      <PaginationContent>
        {previousPage && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(previousPage)} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {nextPage && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
