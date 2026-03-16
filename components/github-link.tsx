import React from 'react'
import { Github } from 'lucide-react'

const GithubLink = () => {
  return (
    <a
      href="https://github.com/zougari47/contribo"
      target="_blank"
      rel="noreferrer"
      className="fixed top-6 right-6 z-50 rounded-full bg-secondary/80 p-3 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:rotate-12 hover:scale-110 hover:text-foreground hover:bg-secondary border border-border/50 shadow-lg"
      aria-label="GitHub Repository"
    >
      <Github className="h-6 w-6" />
    </a>
  )
}

export default GithubLink
