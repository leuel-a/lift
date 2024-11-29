import { useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMembers } from '@/services/membersService'

//region component imports
import { Input } from '@/components/ui/input'

//endregion

export function FilterMembers() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search)

  const { data } = useInfiniteQuery({
    initialPageParam: { page: 1, search: debouncedSearch },
    queryKey: ['searchMembers', { search: debouncedSearch }],
    queryFn: searchMembers,
    getNextPageParam: ({ page: currPage, limit, totalCount }) => {
      const totalPages = Math.ceil(totalCount / limit)
      return currPage < totalPages ? { page: currPage + 1, search: debouncedSearch } : undefined
    },
  })

  console.log("Fetched search members")
  console.log(data?.pages)

  return (
    <div>
      <Input
        className="w-96 border-indigo-200 text-indigo-950 focus-visible:ring-indigo-400"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div></div>
    </div>
  )
}
