import { Globe } from '@/components/ui/globe'
import SearchForm from '@/components/search-form'

export default async function Home() {
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
        
        <SearchForm />
      </div>
    </div>
  )
}
