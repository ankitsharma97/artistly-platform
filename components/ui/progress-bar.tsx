import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

export function ProgressBar({ progress, className, showPercentage = false }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Progress</span>
        {showPercentage && <span className="text-xs sm:text-sm text-gray-500">{Math.round(progress)}%</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
