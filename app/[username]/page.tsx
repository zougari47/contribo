import Contributions from '@/app/contributions'
import Filters from '@/components/filters'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { username } = await params
  
  // Resolve search parameters for server components
  const resolvedSearchParams = await searchParams
  const includeUserRepos = resolvedSearchParams.includeUserRepos === 'true'
  const typeStr = Array.isArray(resolvedSearchParams.type) 
    ? resolvedSearchParams.type[0] 
    : resolvedSearchParams.type
  const type = typeStr || 'both'

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 pb-24 px-4 bg-background">
      
      <div className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
           <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
           Back to Search
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Contributions by <span className="text-primary">@{username}</span>
        </h1>
      </div>

      <Filters disabled={false} />

      <div className="w-full max-w-7xl">
        <Contributions 
          username={username} 
          includeUserRepos={includeUserRepos} 
          type={type}
        />
      </div>
    </div>
  )
}
