import useEcomStore from "@/store/ecom-store";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { ChevronDownIcon } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const actionLogout = useEcomStore((state) => state.actionLogout);
  const isAdmin = useEcomStore((state) => state.isAdmin);

  const navigate = useNavigate();

  const handleLogout = () => {
    actionLogout();
    navigate("/login");
  };

  return (
    <nav>
      <div className="mx-auto">
        <div className="flex justify-between h-17 px-8">
          <div className="flex justify-center items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold">
              <img src="/logocharacter.png" alt="logo" className="h-20 w-25" />
            </Link>
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

          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="py-5.5 rounded-full gap-3"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                      alt="profile_picture"
                      className="w-8 h-8"
                    />
                    <p>{user.email}</p>
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/admin");
                      }}
                    >
                      Management
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/user/history");
                    }}
                  >
                    History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded-full text-md font-bold border border-gray-400 shadow-md"
                    : "hover:bg-gray-200 px-3 py-2 rounded-full text-md"
                }
                to={"/register"}
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded-full text-md font-bold border border-gray-400 shadow-md"
                    : "hover:bg-gray-200 px-3 py-2 rounded-full text-md"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default MainNav;
