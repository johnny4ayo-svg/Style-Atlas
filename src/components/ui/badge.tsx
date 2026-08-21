import React from 'react'

export function Badge({ children, className = '', variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default' | 'secondary' | 'outline' }) {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  const variants = {
    default: "border-transparent bg-brand-black text-white hover:bg-gray-800",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "text-brand-black border border-gray-200"
  }
  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
