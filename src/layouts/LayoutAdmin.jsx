import HeaderAdmin from "@/components/admin/HeaderAdmin";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import SidebarAdminShadcn from "@/components/admin/SidebarAdminShadcn";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar */}
      <div className="flex min-h-screen w-full">
        <SidebarAdminShadcn />
        <SidebarInset className="flex-1">
          <HeaderAdmin />
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default LayoutAdmin;
