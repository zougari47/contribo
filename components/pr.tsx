import { type PullRequest } from '@/app/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import BookIcon from './icons/book'
import CalendarIcon from './icons/calendar'
import { buttonVariants } from './ui/button'
import PullRequestIcon from './icons/pull-request'

//   <a href={pr.url} target="_blank" rel="noopener noreferrer">
//   <h3>{pr.title}</h3>
//   <p>Created at: {new Date(pr.createdAt).toLocaleDateString()}</p>
//   <p>Repository: {pr.repository.nameWithOwner}</p>
// </a>

// card pull request component
export const PR = ({ pr }: { pr: PullRequest }) => {
  return (
    // <a href={pr.url} target="_blank" rel="noopener noreferrer">
    <Card className="hover:scale-105 duration-300">
      <CardHeader>
        <CardTitle> {pr.repository.nameWithOwner}</CardTitle>
        <CardDescription>
          <div className="flex gap-2 items-center">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl">{pr.title}</p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4">
          <a href={pr.url} className={buttonVariants()}>
            Pull Request
            <PullRequestIcon />
          </a>
          <a
            href={pr.repository.url}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Repository
            <BookIcon />
          </a>
        </div>
      </CardFooter>
    </Card>
    // </a>
  )
}

export default PR
