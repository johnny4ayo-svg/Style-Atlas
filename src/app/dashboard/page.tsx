import { redirect } from 'next/navigation'

export default function DashboardIndex() {
  // Normally we would check user role here and redirect accordingly
  redirect('/dashboard/business');
}
