import {
  ChartBarStacked,
  ChevronUp,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
  User2,
  UserCog,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useEcomStore from "@/store/ecom-store";

// Menu items.
const menuItems = [
  {
    title: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    title: "Manage User",
    to: "/admin/manage",
    icon: UserCog,
  },
  {
    title: "Category",
    to: "/admin/category",
    icon: ChartBarStacked,
  },
  {
    title: "Product",
    to: "/admin/product",
    icon: ShoppingBasket,
  },
  {
    title: "Order",
    to: "/admin/orders",
    icon: ListOrdered,
  },
];

const SidebarAdminShadcn = () => {
  const actionLogout = useEcomStore((state) => state.actionLogout);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    actionLogout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r" side="left">
      {/* Header */}
      <SidebarHeader
        className="whitespace-nowrap
      transition-all duration-200 ease-in-out
      opacity-100 translate-x-0
      group-data-[collapsible=icon]:opacity-0
      group-data-[collapsible=icon]:-translate-x-2
      group-data-[collapsible=icon]:pointer-events-none"
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <span className="h-24 flex items-center justify-center text-xl font-bold">Admin Panel</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = item.end
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-[active=true]:bg-primary/10
                    data-[active=true]:text-primary"
                    >
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/user/history");
                  }}
                >
                  <span>History</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarAdminShadcn;
