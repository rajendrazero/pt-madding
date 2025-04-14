type Props = {
  title: string
  children: React.ReactNode
}

export default function AuthCard({ title, children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6 font-sans">{title}</h1>
        {children}
      </div>
    </div>
  )
}