import React from 'react'

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }>(({ className = '', variant = 'default', ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
  const variants = {
    default: "bg-brand-black text-white shadow hover:bg-gray-800",
    outline: "border border-gray-200 bg-transparent shadow-sm hover:bg-gray-100 text-brand-black"
  }
  return (
    <button ref={ref} className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />
  )
})
Button.displayName = "Button"
