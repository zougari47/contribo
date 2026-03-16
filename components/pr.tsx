import { type Contribution } from '@/app/github'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CalendarIcon from './icons/calendar'
import { buttonVariants } from './ui/button'
import { GitPullRequest, CircleDot, Star, FolderGit2 } from 'lucide-react'

// Formats a number like 1200 -> "1.2k"
function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

export const PR = ({ pr }: { pr: Contribution }) => {
  const isIssue = pr.url.includes('/issues/')
  const stars: number | undefined = pr.repository?.stargazerCount

  return (
    <Card className="flex flex-col w-full h-full hover:shadow-md transition-all duration-300 group border-border/60 hover:border-primary/50 relative overflow-hidden bg-gradient-to-br from-card to-card/50">
      
      {/* Decorative top border gradient on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="leading-tight">
            <a
              href={pr.repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:text-primary transition-colors line-clamp-2"
              title={pr.repository.nameWithOwner}
            >
              <FolderGit2 className="w-6 h-6 shrink-0 text-primary/80" />
              {pr.repository.nameWithOwner}
            </a>
          </CardTitle>

          {typeof stars === 'number' && (
            <span 
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground shadow-sm"
              title={`${stars} stars`}
            >
              {formatStars(stars)}
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow pt-5">
        {/* We keep the contribution title as is, but now it's naturally smaller than the 2xl repo title */}
        <p className="text-lg font-medium leading-normal text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {pr.title}
        </p>
      </CardContent>

      <CardFooter className="pt-4 pb-5 flex items-center justify-between border-t border-border/40 bg-muted/20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4" />
          <time dateTime={pr.createdAt}>{new Date(pr.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</time>
        </div>

        <a
          href={pr.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'default', size: 'sm', className: "shadow-sm rounded-full px-4" })}
        >
          {isIssue ? (
            <>
              Issue
              <CircleDot className="ml-2 w-3.5 h-3.5" />
            </>
          ) : (
            <>
              PR
              <GitPullRequest className="ml-2 w-3.5 h-3.5" />
            </>
          )}
        </a>
      </CardFooter>
    </Card>
  )
}

export default PR
