"use client"

import type { UseFormReturn } from "react-hook-form"
import { Music, Globe, DollarSign } from "lucide-react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, LANGUAGES, FEE_RANGES } from "@/lib/mock-data"
import type { FormData } from "@/types"

interface StageTwoProps {
  form: UseFormReturn<FormData>
}

export function StageTwo({ form }: StageTwoProps) {
  const watchedCategories = form.watch("category") || []
  const watchedLanguages = form.watch("languages") || []

  return (
    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Performance Details</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-2">
          Help event planners understand your expertise and find the perfect match for their events.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Categories */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Performance Categories
            </CardTitle>
            <CardDescription className="text-sm">What type of performances do you specialize in?</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Categories * (Select all that apply)</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {CATEGORIES.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="category"
                        render={({ field }) => {
                          return (
                            <FormItem key={category} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, category])
                                      : field.onChange(field.value?.filter((value) => value !== category))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer text-sm hover:text-purple-600 transition-colors leading-tight">
                                {category}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  {watchedCategories.length > 0 && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-purple-700 mb-2">Selected categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {watchedCategories.map((cat) => (
                          <Badge key={cat} variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Languages
            </CardTitle>
            <CardDescription className="text-sm">Which languages can you perform in?</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Languages * (Select all that apply)</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {LANGUAGES.map((language) => (
                      <FormField
                        key={language}
                        control={form.control}
                        name="languages"
                        render={({ field }) => {
                          return (
                            <FormItem key={language} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(language)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, language])
                                      : field.onChange(field.value?.filter((value) => value !== language))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer text-sm hover:text-purple-600 transition-colors leading-tight">
                                {language}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  {watchedLanguages.length > 0 && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-purple-700 mb-2">Selected languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {watchedLanguages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Fee Range */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Pricing
            </CardTitle>
            <CardDescription className="text-sm">What's your typical fee range for performances?</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="feeRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Fee Range *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 sm:h-12">
                        <SelectValue placeholder="Select your typical fee range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FEE_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="mt-2 text-xs sm:text-sm text-gray-600">
                    💡 This helps event planners find artists within their budget. You can always negotiate specific
                    rates for individual bookings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
