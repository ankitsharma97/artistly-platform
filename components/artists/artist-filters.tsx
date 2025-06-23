"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CATEGORIES, LOCATIONS, FEE_RANGES } from "@/lib/mock-data"
import type { FilterOptions } from "@/types"

interface ArtistFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  resultsCount: number
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function ArtistFilters({ filters, onFiltersChange, resultsCount }: ArtistFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(filters.searchQuery)

  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchValue, 300)

  // Update search query when debounced value changes
  useEffect(() => {
    onFiltersChange({
      ...filters,
      searchQuery: debouncedSearchValue,
    })
  }, [debouncedSearchValue])

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.category, category] : filters.category.filter((c) => c !== category)

    onFiltersChange({
      ...filters,
      category: newCategories,
    })
  }

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location: location === "all" ? "" : location,
    })
  }

  const handlePriceRangeChange = (priceRange: string) => {
    onFiltersChange({
      ...filters,
      priceRange: priceRange === "all" ? "" : priceRange,
    })
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const clearFilters = () => {
    setSearchValue("")
    onFiltersChange({
      category: [],
      location: "",
      priceRange: "",
      searchQuery: "",
    })
  }

  const hasActiveFilters = filters.category.length > 0 || filters.location || filters.priceRange || filters.searchQuery

  const FilterContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-xs sm:text-sm font-medium">
          Search Artists
        </Label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            placeholder="Search by name, bio, or category..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10 sm:h-11 text-sm"
          />
        </div>
        {searchValue && (
          <p className="text-xs text-gray-500 mt-1">
            Search will update automatically as you type
          </p>
        )}
      </div>

      {/* Categories */}
      <div>
        <Label className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 block">Categories</Label>
        <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={`category-${category}`} className="text-xs sm:text-sm font-normal cursor-pointer leading-tight">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <Label className="text-xs sm:text-sm font-medium mb-2 block">Location</Label>
        <Select value={filters.location || "all"} onValueChange={handleLocationChange}>
          <SelectTrigger className="h-10 sm:h-11">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {LOCATIONS.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-xs sm:text-sm font-medium mb-2 block">Price Range</Label>
        <Select value={filters.priceRange || "all"} onValueChange={handlePriceRangeChange}>
          <SelectTrigger className="h-10 sm:h-11">
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Price Ranges</SelectItem>
            {FEE_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full h-10 sm:h-11 text-sm">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-80 bg-white p-4 sm:p-6 border-r">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold">Filters</h2>
          <span className="text-xs sm:text-sm text-gray-500">{resultsCount} results</span>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-3 sm:p-4 bg-white border-b">
          <span className="text-xs sm:text-sm text-gray-600">{resultsCount} artists found</span>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 sm:h-10 text-xs sm:text-sm">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 sm:ml-2 bg-blue-600 text-white text-xs rounded-full px-1.5 sm:px-2 py-0.5">
                    {filters.category.length + (filters.location ? 1 : 0) + (filters.priceRange ? 1 : 0) + (filters.searchQuery ? 1 : 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle className="text-base sm:text-lg">Filter Artists</SheetTitle>
              </SheetHeader>
              <div className="mt-4 sm:mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}
