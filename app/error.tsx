'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service optionally
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
      <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-center">Something went wrong!</h2>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
