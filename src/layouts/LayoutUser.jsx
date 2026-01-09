import MainNav from "@/components/navbar/MainNav"
import { Outlet } from "react-router-dom"

const LayoutUser = () => {
  return (
    <div>
      <MainNav />

      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
export default LayoutUser