import { getLatestContributions, type Contribution, type PageInfo } from './github'
import PR from '@/components/pr'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export const Contributions = async ({ 
  username,
  includeUserRepos = false,
  type = 'prs',
  cursor,
  direction = 'after',
  page = 1
}: { 
  username: string
  includeUserRepos?: boolean
  type?: string
  cursor?: string
  direction?: 'after' | 'before'
  page?: number
}) => {
  let contributions: Contribution[] = []
  let pageInfo: PageInfo | null = null
  let isError = false
  let errorMsg = ''

  try {
    const result = await getLatestContributions({ username, includeUserRepos, type, cursor, direction })
    contributions = result.contributions
    pageInfo = result.pageInfo
  } catch (error: any) {
    isError = true
    errorMsg = error.message
    console.error(error)
  }

  if (isError && errorMsg === 'NO_USER') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-border/50 rounded-xl bg-card">
        <p className="text-xl font-medium">No user found with username &quot;{username}&quot;</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-destructive border border-destructive/20 rounded-xl bg-destructive/5">
        <p className="text-xl font-medium">Failed to load contributions.</p>
      </div>
    )
  }

  if (contributions.length === 0 && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-border/50 rounded-xl bg-card">
        <p className="text-xl font-medium">No contributions yet.</p>
      </div>
    )
  }

  const buildPageUrl = (newCursor: string | null, newDirection: 'after' | 'before', newPage: number) => {
    const params = new URLSearchParams()
    if (includeUserRepos) params.set('includeUserRepos', 'true')
    if (type !== 'prs') params.set('type', type)
    if (newCursor) params.set('cursor', newCursor)
    if (newDirection === 'before') params.set('direction', 'before')
    if (newPage > 1) params.set('page', String(newPage))
    const queryStr = params.toString()
    return `/${username}${queryStr ? '?' + queryStr : ''}`
  }

  const hasPrev = page > 1
  const hasNext = pageInfo?.hasNextPage ?? false

  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((item, index) => (
          <li key={item.url || index} className="flex">
            <PR pr={item} />
          </li>
        ))}
      </ul>

      {(hasPrev || hasNext) && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href={buildPageUrl(pageInfo?.startCursor ?? null, 'before', page - 1)}
            className={buttonVariants({
              variant: 'outline',
              className: !hasPrev ? 'pointer-events-none opacity-50' : ''
            })}
            aria-disabled={!hasPrev}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Link>
          
          <span className="text-sm font-medium text-muted-foreground">
            Page {page}
          </span>
          
          <Link
            href={buildPageUrl(pageInfo?.endCursor ?? null, 'after', page + 1)}
            className={buttonVariants({
              variant: 'outline',
              className: !hasNext ? 'pointer-events-none opacity-50' : ''
            })}
            aria-disabled={!hasNext}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Contributions
