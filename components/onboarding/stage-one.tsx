"use client"

import type { UseFormReturn } from "react-hook-form"
import { Upload, User, MapPin, FileText } from "lucide-react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LOCATIONS } from "@/lib/mock-data"
import type { FormData } from "@/types"

interface StageOneProps {
  form: UseFormReturn<FormData>
}

export function StageOne({ form }: StageOneProps) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-2">
          Let's start with the basics. This information will help event planners discover and connect with you.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Artist Name */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Artist Identity
            </CardTitle>
            <CardDescription className="text-sm">How should event planners know you?</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Artist/Stage Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Priya Sharma, DJ Arjun, The Harmony Band"
                      className="h-11 sm:h-12 text-base sm:text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Your Story
            </CardTitle>
            <CardDescription className="text-sm">Share your experience and what makes you unique</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Professional Bio *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience, achievements, and what makes your performances special..."
                      className="min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                    <span>Minimum 50 characters required</span>
                    <span className="text-blue-600 font-medium">{field.value?.length || 0}/500</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Location
            </CardTitle>
            <CardDescription className="text-sm">Where are you primarily based?</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Primary Location *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 sm:h-12">
                        <SelectValue placeholder="Select your primary location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Profile Image */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Profile Image
            </CardTitle>
            <CardDescription className="text-sm">Add a professional photo to make a great first impression</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-gradient-to-br from-blue-50 to-purple-50">
                      <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
                      <div className="space-y-2">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            Upload a photo
                          </span>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              field.onChange(file)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </FormControl>
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
