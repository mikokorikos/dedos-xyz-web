import { ComponentProps } from "react"

import { cn, gradientButtonClass, primaryButtonClass, subtleButtonClass } from "@/lib/utils"

type ButtonVariant = "gradient" | "primary" | "outline"

export default function Button(props: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  const { className, variant = "gradient", ...rest } = props
  const base =
    variant === "gradient"
      ? gradientButtonClass
      : variant === "primary"
        ? primaryButtonClass
        : subtleButtonClass

  return <a {...rest} className={cn(base, className)} />
}
