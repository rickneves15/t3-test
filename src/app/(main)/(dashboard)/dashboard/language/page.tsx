import { ListLanguage } from '~/components/pages/language/list'

export default async function Language() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="flex-1">List Language</span>
          </h2>
        </div>
      </div>

      <ListLanguage />
    </div>
  )
}
