"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Stepper } from "@/components/ui/stepper"
import { ProgressBar } from "@/components/ui/progress-bar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { StageOne } from "@/components/onboarding/stage-one"
import { StageTwo } from "@/components/onboarding/stage-two"
import { StageThree } from "@/components/onboarding/stage-three"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// Enhanced form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must be less than 500 characters"),
  category: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Please enter your location"),
  profileImage: z.any().optional(),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Personal details",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Skills & pricing",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm & submit",
  },
]

export default function OnboardingClientPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
    },
    mode: "onChange",
  })

  // Auto-save form data to localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("artistly-onboarding", JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Load saved form data on mount
  useEffect(() => {
    const saved = localStorage.getItem("artistly-onboarding")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        form.reset(data)
      } catch (error) {
        console.error("Failed to load saved form data:", error)
      }
    }
  }, [form])

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "bio", "location"]
        break
      case 2:
        fieldsToValidate = ["category", "languages", "feeRange"]
        break
      case 3:
        // All fields should be validated
        return form.trigger()
    }

    return form.trigger(fieldsToValidate)
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)

      const response = await fetch("/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create artist profile")
      }

      // Clear saved form data
      localStorage.removeItem("artistly-onboarding")

      setIsSuccess(true)
      toast({
        title: "🎉 Profile Created Successfully!",
        description: "Your artist profile has been created. You will start receiving booking requests soon.",
      })

      // Reset form
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md text-center shadow-2xl border-0">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="animate-in zoom-in-50 duration-500">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome to Artistly!</h2>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Your artist profile has been created successfully. Event planners can now discover your talent and
                  send you booking requests.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm text-gray-700">
                    <strong>What's next?</strong>
                    <br />• Check your email for confirmation
                    <br />• Complete your profile verification
                    <br />• Start receiving booking requests!
                  </p>
                </div>
                <div className="flex flex-col gap-3 mt-6 sm:mt-8">
                  <Button onClick={() => setIsSuccess(false)} className="w-full h-11 sm:h-12 text-base sm:text-lg">
                    Create Another Profile
                  </Button>
                  <Button variant="outline" className="w-full h-11 sm:h-12" onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join as an Artist
            </h1>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Create your professional artist profile in just 3 simple steps and start receiving booking requests from
            event planners across India.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <ProgressBar progress={progress} className="mb-4 sm:mb-6" showPercentage />
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {/* Stage Content */}
                <div className="min-h-[500px] sm:min-h-[600px]">
                  {currentStep === 1 && <StageOne form={form} />}
                  {currentStep === 2 && <StageTwo form={form} />}
                  {currentStep === 3 && <StageThree form={form} onEdit={goToStep} />}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-200 gap-4 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={cn("h-11 sm:h-12 px-4 sm:px-6 w-full sm:w-auto", currentStep === 1 && "invisible")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2 order-first sm:order-none">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={cn("w-2 h-2 rounded-full transition-all duration-300", {
                          "bg-blue-600": index + 1 <= currentStep,
                          "bg-gray-300": index + 1 > currentStep,
                        })}
                      />
                    ))}
                  </div>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="h-11 sm:h-12 px-4 sm:px-6 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Creating Profile...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Create Profile
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@artistly.com" className="text-blue-600 hover:underline">
              support@artistly.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
