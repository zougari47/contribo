export interface Repository {
  nameWithOwner: string
  url: string
  stargazerCount: number
}

export interface Contribution {
  type: 'PR' | 'ISSUE'
  createdAt: string
  title: string
  url: string
  repository: Repository
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export const getLatestContributions = async ({
  username,
  includeUserRepos = false,
  type = 'both', // 'prs' | 'issues' | 'both'
  cursor,
  direction = 'after', // 'after' | 'before'
}: {
  username: string
  includeUserRepos?: boolean
  type?: string
  cursor?: string
  direction?: 'after' | 'before'
}): Promise<{ contributions: Contribution[]; pageInfo: PageInfo }> => {
  // Construct search query
  let queryString = `author:${username} is:public sort:created-desc`

  if (!includeUserRepos) {
    queryString += ` -user:${username}`
  }

  if (type === 'prs') {
    queryString += ` is:pr`
  } else if (type === 'issues') {
    queryString += ` is:issue`
  }

  const paginationArgs = direction === 'before' 
    ? `last: 12, before: $cursor` 
    : `first: 12, after: $cursor`

  const query = `
    query ($queryString: String!, $cursor: String) {
      search(query: $queryString, type: ISSUE, ${paginationArgs}) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          ... on PullRequest {
            __typename
            title
            url
            createdAt
            repository {
              nameWithOwner
              url
              stargazerCount
            }
          }
          ... on Issue {
            __typename
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
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
    },
    body: JSON.stringify({ query, variables: { cursor, queryString } }),
    // disable Next.js aggressive cache if we want fresh results on pagination
    next: { revalidate: 60 } 
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Unknown error')
  }

  const searchData = json.data?.search
  if (!searchData) {
    return { contributions: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null } }
  }

  const contributions: Contribution[] = searchData.nodes.map((node: any) => ({
    type: node.__typename === 'PullRequest' ? 'PR' : 'ISSUE',
    title: node.title,
    url: node.url,
    createdAt: node.createdAt,
    repository: node.repository,
  }))

  return {
    contributions,
    pageInfo: searchData.pageInfo
  }
}
