interface Repository {
  nameWithOwner: string
  url: string
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
}: {
  username: string
}) => {
  let totalContributions: PullRequest[] = []
  let hasNextPage = true
  let cursor: string | null = null

  const fetchContributions = async (
    cursor: string | null,
    username: string
  ) => {
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
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
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

    const json: GraphQLResponse = await response.json()

    if (json.errors) {
      throw new Error(json.errors[0]?.message || 'Unknown error')
    }

    const contributions =
      json.data.user.contributionsCollection.pullRequestContributions

    // Filter out my repositories
    const filteredContributions = contributions.nodes
      .filter(Boolean)
      .map(node => node.pullRequest)
      .filter((pr: PullRequest) => !pr.url.includes(`github.com/${username}`))

    totalContributions = [...totalContributions, ...filteredContributions]

    return {
      hasNextPage: contributions.pageInfo.hasNextPage,
      endCursor: contributions.pageInfo.endCursor,
    }
  }

  // Keep fetching until no more pages or we have 5 contributions or more
  while (hasNextPage && totalContributions.length < 5) {
    const pageInfo = await fetchContributions(cursor, username)
    hasNextPage = pageInfo.hasNextPage
    cursor = pageInfo.endCursor
  }

  return totalContributions.slice(0, 15) // Return only up to 15 contributions
}
