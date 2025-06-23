"use client"

import type { UseFormReturn } from "react-hook-form"
import { CheckCircle, Edit, User, Music, Globe, DollarSign, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FormData } from "@/types"

interface StageThreeProps {
  form: UseFormReturn<FormData>
  onEdit: (stage: number) => void
}

export function StageThree({ form, onEdit }: StageThreeProps) {
  const formData = form.getValues()

  return (
    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Review Your Profile</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-2">
          Please review all the information below. You can edit any section before submitting your profile.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Basic Information */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Basic Information
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onEdit(1)} className="text-blue-600 hover:text-blue-700 w-full sm:w-auto h-9 sm:h-10">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">Artist Name</label>
                <p className="text-base sm:text-lg font-semibold text-gray-900">{formData.name || "Not provided"}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">Location</label>
                <p className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {formData.location || "Not provided"}
                </p>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-500">Bio</label>
              <p className="text-sm sm:text-base text-gray-700 mt-1 leading-relaxed">{formData.bio || "No bio provided"}</p>
            </div>
            {formData.profileImage && (
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">Profile Image</label>
                <p className="text-green-600 text-xs sm:text-sm mt-1">✓ Image uploaded successfully</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Details */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                Performance Details
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onEdit(2)} className="text-blue-600 hover:text-blue-700 w-full sm:w-auto h-9 sm:h-10">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-500">Categories</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.category?.length > 0 ? (
                  formData.category.map((cat) => (
                    <Badge key={cat} variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                      {cat}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No categories selected</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-500">Languages</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.languages?.length > 0 ? (
                  formData.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No languages selected</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-500">Fee Range</label>
              <p className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1 mt-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                {formData.feeRange || "Not specified"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl text-center text-gray-900">Profile Summary</CardTitle>
            <CardDescription className="text-center text-sm">
              This is how your profile will appear to event planners
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{formData.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{formData.location}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                    {formData.category?.slice(0, 3).map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                    {formData.category && formData.category.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{formData.category.length - 3} more</Badge>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 line-clamp-2">{formData.bio}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-3 sm:mt-4">
                    <span className="text-base sm:text-lg font-semibold text-blue-600">{formData.feeRange}</span>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">
                        {formData.languages?.slice(0, 2).join(", ")}
                        {formData.languages && formData.languages.length > 2 && " +more"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
