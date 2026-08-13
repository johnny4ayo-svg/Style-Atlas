'use client'
import { useTransition } from "react"
import { toggleFavourite } from "@/app/actions/user-actions"

export default function SaveButton({ businessId, businessName, isSaved = false }: { businessId: string, businessName: string, isSaved?: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      className={`save-btn ${isSaved ? 'active' : ''}`}
      aria-label={`Save ${businessName}`}
      onClick={() => startTransition(() => toggleFavourite(businessId))}
      disabled={isPending}
      style={{ opacity: isPending ? 0.5 : 1 }}
    >
      <svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg>
    </button>
  )
}
