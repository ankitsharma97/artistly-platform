"use client"

import { useToast } from "@/hooks/use-toast"
import { X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full md:max-w-[420px] p-4 space-y-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative flex w-full items-start space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all animate-in slide-in-from-bottom-5 pointer-events-auto",
            {
              "border-red-200 bg-red-50 text-red-900": toast.variant === "destructive",
              "border-gray-200 bg-white text-gray-900": toast.variant === "default",
            },
          )}
        >
          <div className="flex-shrink-0">
            {toast.variant === "destructive" ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            {toast.title && <div className="text-sm font-semibold leading-none">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90 leading-relaxed">{toast.description}</div>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-6 w-6 p-0 hover:bg-gray-100"
            onClick={() => dismiss(toast.id)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      ))}
    </div>
  )
}
