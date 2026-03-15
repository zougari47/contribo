import Contributions from './contributions'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Globe } from '@/components/ui/globe'
import { Search } from 'lucide-react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { user } = await searchParams

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-primary selection:text-primary-foreground">
      {/* Decorative Globe */}
      <div 
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] md:top-[-400px] opacity-40 cursor-pointer -z-10 mix-blend-screen transition-opacity duration-1000 animate-in fade-in" 
        aria-hidden="true"
      >
         <Globe className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-2xl mt-32 md:mt-48">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground transition-all duration-700 ease-out">
          Contribo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-md font-medium">
          A beautifully simplified view of any developer's open-source contributions.
        </p>
        
        <Form action="/" className="flex w-full max-w-md gap-2 shadow-2xl shadow-primary/5 rounded-full p-1.5 bg-background/80 backdrop-blur-xl border border-border/60 transition-all duration-300 hover:shadow-primary/10">
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
        </Form>
      </div>

      <div className="mt-16 w-full max-w-5xl z-10 flex flex-col items-center pb-24 relative min-h-[400px]">
        {user ? (
          <Contributions username={user as string} />
        ) : null}
      </div>
    </div>
  )
}
