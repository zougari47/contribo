import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <FileQuestion className="h-24 w-24 text-muted-foreground mb-8" />
      <h2 className="text-4xl font-extrabold tracking-tight mb-4">Page Not Found</h2>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        Could not find the requested resource. The url might be incorrect or the page might have been removed.
      </p>
      <Link 
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Return Home
      </Link>
    </div>
  )
}
