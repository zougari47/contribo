'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = formData.get('user')
    if (user && typeof user === 'string' && user.length >= 3) {
      router.push(`/${user}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 shadow-2xl shadow-primary/5 rounded-full p-1.5 bg-background/80 backdrop-blur-xl border border-border/60 transition-all duration-300 hover:shadow-primary/10">
      <div className="relative w-full flex items-center group">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input 
          name="user" 
          required 
          minLength={3}
          placeholder="Enter a GitHub username..." 
          className="pl-12 h-12 w-full text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/70" 
        />
      </div>
      <Button type="submit" className="h-12 px-8 rounded-full shadow-md font-semibold text-base transition-transform active:scale-95 duration-200">
        Check
      </Button>
    </form>
  )
}
