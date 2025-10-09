import { ComponentProps } from "react"
export default function Button(props: ComponentProps<"a"> & { variant?: "gradient" | "primary" }) {
  const { className = "", variant = "gradient", ...rest } = props
  const base = "btn " + (variant === "gradient" ? "btn-gradient" : "btn-primary")
  return <a {...rest} className={`${base} ${className}`} />
}
