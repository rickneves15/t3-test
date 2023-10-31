import { Menu } from '~/components/Menu'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      <Menu />
      <div className="container flex-1 items-start py-8">{children}</div>
    </div>
  )
}
