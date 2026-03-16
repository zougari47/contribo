import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[50vh] animate-in fade-in duration-500 delay-150 fill-mode-both">
      <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
      <p className="mt-6 text-xl font-medium text-muted-foreground">Loading...</p>
    </div>
  )
}
