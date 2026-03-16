interface Repository {
  nameWithOwner: string
  url: string
  stargazerCount: number
}

export interface PullRequest {
  createdAt: string
  title: string
  url: string
  repository: Repository
}

interface Issue {
  issue: {
    title: string
    url: string
    createdAt: string
    repository: Repository
  }
}

interface ContributionsCollection {
  pullRequestContributions: {
    nodes: {
      pullRequest: PullRequest
    }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
  issueContributions: {
    nodes: Issue[]
  }
  repositoriesContributedTo: {
    nodes: Repository[]
  }
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: ContributionsCollection
    }
  }
  errors?: { message: string }[]
}

export const getLatestContributions = async ({
  username,
  includeUserRepos = false,
  type = 'both', // 'prs' | 'issues' | 'both'
}: {
  username: string
  includeUserRepos?: boolean
  type?: string
}) => {
  let totalContributions: (PullRequest | Issue['issue'])[] = []
  let hasNextPage = true
  let cursor: string | null = null

  const fetchContributions = async (
    cursor: string | null,
    username: string
  ) => {
    // Only difference from previous query is adding issueContributions
    const query = `
      query ($cursor: String, $username: String!) {
        user(login: $username) {
          contributionsCollection {
            pullRequestContributions(first: 100, after: $cursor) {
              nodes {
                pullRequest {
                  title
                  url
                  createdAt
                  repository {
                    nameWithOwner
                    url
                    stargazerCount
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
            issueContributions(first: 100, after: $cursor) {
              nodes {
                issue {
                  title
                  url
                  createdAt
                  repository {
                    nameWithOwner
                    url
                    stargazerCount
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      body: JSON.stringify({ query, variables: { cursor, username } }),
    })

    const json = await response.json()

    if (json.errors) {
      if (json.errors[0]?.type === 'NOT_FOUND') {
        throw new Error('NO_USER')
      }
      throw new Error(json.errors[0]?.message || 'Unknown error')
    }

    const prNode = json.data.user.contributionsCollection.pullRequestContributions
    const issueNode = json.data.user.contributionsCollection.issueContributions

    let combined: any[] = []

    if (type === 'both' || type === 'prs') {
      const prs = prNode.nodes.filter(Boolean).map((n: any) => n.pullRequest)
      combined = [...combined, ...prs]
    }
    
    if (type === 'both' || type === 'issues') {
      const issues = issueNode.nodes.filter(Boolean).map((n: any) => n.issue)
      combined = [...combined, ...issues]
    }

    // Filter out user's own repositories if includeUserRepos is false
    if (!includeUserRepos) {
      combined = combined.filter((c: any) => !c.url.includes(`github.com/${username}`))
    }

    totalContributions = [...totalContributions, ...combined]

    // We only paginate based on PRs for simplicity, as it usually scales fine for recent scope
    return {
      hasNextPage: prNode.pageInfo.hasNextPage,
      endCursor: prNode.pageInfo.endCursor,
    }
  }

  // Keep fetching until no more pages or we have 5 valid contributions or more
  while (hasNextPage && totalContributions.length < 5) {
    const pageInfo = await fetchContributions(cursor, username)
    hasNextPage = pageInfo.hasNextPage
    cursor = pageInfo.endCursor
  }

  // Sort by created descending
  totalContributions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return totalContributions.slice(0, 15) // Return up to 15
}
