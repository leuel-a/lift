import { useDebounce } from '@/hooks/use-debounce'
import { useState, useRef, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMembers } from '@/services/membersService'

//region component imports
import { Input } from '@/components/ui/input'

//endregion

export function FilterMembers() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search)
  const observerElem = useRef<HTMLDivElement | null>(null)

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: { page: 1, search: debouncedSearch },
    queryKey: ['searchMembers', { search: debouncedSearch }],
    queryFn: searchMembers,
    getNextPageParam: ({ page: currPage, limit, totalCount }) => {
      const totalPages = Math.ceil(totalCount / limit)
      return currPage < totalPages ? { page: currPage + 1, search: debouncedSearch } : undefined
    },
  })

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          const [entry] = entries

          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage()
          }

          if (node) {
            observer.current?.observe(node)
          }
        },
        { root: observerElem.current },
      )
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  )

  return (
    <div className="relative">
      <Input
        className="w-96 border-indigo-200 text-indigo-950 focus-visible:ring-indigo-400"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {debouncedSearch.length !== 0 && data && (
        <div
          ref={observerElem}
          className="absolute z-10 mt-4 max-h-80 overflow-scroll rounded-md border border-indigo-400 bg-white px-2"
        >
          {data.pages[0].data.map((member, index) => {
            const currPageLen = data.pages[0].data.length
            if (index === currPageLen - 1) {
              return (
                <div ref={lastElementRef} className="w-96 py-2 text-sm">{`${member.firstName} ${member.lastName}`}</div>
              )
            }

            return <div className="w-96 py-2 text-sm">{`${member.firstName} ${member.lastName}`}</div>
          })}
        </div>
      )}
    </div>
  )
}
