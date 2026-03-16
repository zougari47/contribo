import { getLatestContributions } from './github'
import PR from '@/components/pr'

export const Contributions = async ({ 
  username,
  includeUserRepos = false,
  type = 'both'
}: { 
  username: string
  includeUserRepos?: boolean
  type?: string
}) => {
  let contributions: any[] = []
  let isError = false
  let errorMsg = ''

  try {
    contributions = await getLatestContributions({ username, includeUserRepos, type })
  } catch (error: any) {
    isError = true
    errorMsg = error.message
    console.error(error)
  }

  if (isError && errorMsg === 'NO_USER') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-border/50 rounded-xl bg-card">
        <p className="text-xl font-medium">No user found with username "{username}"</p>
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

  if (contributions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-border/50 rounded-xl bg-card">
        <p className="text-xl font-medium">No contributions yet.</p>
      </div>
    )
  }

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributions.map((item, index) => (
        <li key={index} className="flex">
          <PR pr={item} />
        </li>
      ))}
    </ul>
  )
}

export default Contributions
