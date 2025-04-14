export default function UserLayout() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">User Area</h1>
      <Outlet />
    </div>
  )
}