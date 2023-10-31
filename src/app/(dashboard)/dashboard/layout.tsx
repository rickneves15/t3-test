import { Sidebar } from '~/components/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-12">{children}</div>
    </div>
  )
}
