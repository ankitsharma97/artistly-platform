"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out",
                    {
                      "bg-blue-600 border-blue-600 text-white shadow-lg": isCompleted,
                      "bg-blue-600 border-blue-600 text-white shadow-lg ring-4 ring-blue-100": isCurrent,
                      "bg-white border-gray-300 text-gray-400": isUpcoming,
                    },
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Pulse animation for current step */}
                {isCurrent && <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />}
              </div>

              {/* Step Content */}
              <div className="ml-2 sm:ml-4 flex-1">
                <div
                  className={cn("text-xs sm:text-sm font-medium transition-colors duration-200", {
                    "text-blue-600": isCompleted || isCurrent,
                    "text-gray-400": isUpcoming,
                  })}
                >
                  {step.title}
                </div>
                <div
                  className={cn("text-xs transition-colors duration-200 hidden sm:block", {
                    "text-gray-600": isCompleted || isCurrent,
                    "text-gray-400": isUpcoming,
                  })}
                >
                  {step.description}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div
                    className={cn("h-0.5 transition-all duration-500 ease-in-out", {
                      "bg-blue-600": stepNumber < currentStep,
                      "bg-gradient-to-r from-blue-600 to-gray-300": stepNumber === currentStep,
                      "bg-gray-300": stepNumber > currentStep,
                    })}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
