import { getLatestContributions, type PullRequest } from './github'
import PR from '@/components/pr'

// this is server component to fetch contributions
export const Contributions = async ({ username }: { username: string }) => {
  let contributions: PullRequest[] = []
  let isError = false

  try {
    contributions = await getLatestContributions({ username })
  } catch (error) {
    isError = true
    console.error(error)
  }

  return (
    <>
      {isError ? (
        <div>Error</div>
      ) : contributions.length > 0 ? (
        <ul>
          {contributions.map((pr, index) => (
            <li key={index} className="mb-4">
              <PR pr={pr} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No contributions found</div>
      )}
    </>
  )
}

export default Contributions
