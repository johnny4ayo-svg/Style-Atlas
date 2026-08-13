'use client'
import { useTransition } from "react"
import { toggleComparison } from "@/app/actions/user-actions"

export default function CompareButton({ businessId, businessName, isCompared = false }: { businessId: string, businessName: string, isCompared?: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      className={`compare-btn ${isCompared ? 'active' : ''}`}
      aria-label={`Compare ${businessName}`}
      onClick={() => startTransition(() => toggleComparison(businessId))}
      disabled={isPending}
      style={{ opacity: isPending ? 0.5 : 1 }}
    >
      <svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg>
    </button>
  )
}
