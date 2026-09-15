"use client"

import { toast as sonnerToast, type ExternalToast } from "sonner"

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning" | "info"
}

function toast({
  title,
  description,
  action,
  variant = "default",
}: ToastProps) {
  const options: ExternalToast = {
    description,
    action: action as ExternalToast["action"],
  }

  switch (variant) {
    case "success":
      return sonnerToast.success(title, options)

    case "error":
      return sonnerToast.error(title, options)

    case "warning":
      return sonnerToast.warning(title, options)

    case "info":
      return sonnerToast.info(title, options)

    default:
      return sonnerToast(title, options)
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId)
    },
  }
}

export { useToast, toast }