'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

export default function Filters({ disabled }: { disabled?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read the current applied values from URL
  const appliedIncludeRepos = searchParams.get('includeUserRepos') === 'true'
  const appliedType = searchParams.get('type') || 'both'

  // Local state for pending (uncommitted) filter values
  const [pendingIncludeRepos, setPendingIncludeRepos] = useState(appliedIncludeRepos)
  const [pendingType, setPendingType] = useState(appliedType)

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (pendingIncludeRepos) {
      params.set('includeUserRepos', 'true')
    } else {
      params.delete('includeUserRepos')
    }

    if (pendingType && pendingType !== 'both') {
      params.set('type', pendingType)
    } else {
      params.delete('type')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const isDirty =
    pendingIncludeRepos !== appliedIncludeRepos || pendingType !== appliedType

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-card p-6 rounded-xl border border-border/50 shadow-sm w-full max-w-7xl mb-8">

      {/* Include User Repos Toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="include-repos"
          disabled={disabled}
          checked={pendingIncludeRepos}
          onCheckedChange={(checked) => setPendingIncludeRepos(!!checked)}
        />
        <Label
          htmlFor="include-repos"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
        >
          Include User Repositories
        </Label>
      </div>

      <div className="w-px h-8 bg-border hidden md:block" />

      {/* Contribution Type Radio */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm text-muted-foreground mb-1">Show Contributions:</Label>
        <RadioGroup
          disabled={disabled}
          value={pendingType}
          onValueChange={(val) => setPendingType(val)}
          className="flex flex-row space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="type-both" />
            <Label htmlFor="type-both" className="cursor-pointer select-none">Both</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prs" id="type-prs" />
            <Label htmlFor="type-prs" className="cursor-pointer select-none">Pull Requests</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="issues" id="type-issues" />
            <Label htmlFor="type-issues" className="cursor-pointer select-none">Issues</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Apply Filters button */}
      <Button
        id="apply-filters-btn"
        onClick={applyFilters}
        disabled={disabled || !isDirty}
        className="flex items-center gap-2 shrink-0"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Apply Filters
      </Button>
    </div>
  )
}
