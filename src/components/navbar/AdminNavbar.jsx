import useEcomStore from "@/store/ecom-store";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, PanelLeft } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

const AdminNavbar = () => {
  const carts = useEcomStore((state) => state.carts);

  return (
      <div className="mx-auto">
        <div className="flex h-17 px-8">
          <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-2 rounded-full text-md font-bold border border-gray-400 shadow-md"
                  : "hover:bg-gray-200 px-3 py-2 rounded-full text-md"
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-2 rounded-full text-md font-bold border border-gray-400 shadow-md"
                  : "hover:bg-gray-200 px-3 py-2 rounded-full text-md"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "relative px-3 py-2 rounded-full text-md font-bold border border-gray-400 shadow-md"
                  : "relative hover:bg-gray-200 px-3 py-2 rounded-full text-md"
              }
              to={"/cart"}
            >
              Cart
              {carts.length > 0 && (
                <Badge
                  className="absolute -top-1.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  {carts.length}
                </Badge>
              )}
            </NavLink>
          </div>


        </div>
      </div>
  )
}
export default AdminNavbar