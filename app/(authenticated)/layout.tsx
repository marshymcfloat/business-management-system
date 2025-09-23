import AppSidebar from "@/components/authenticated/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="h-screen bg-amber-100 w-full">
          <SidebarTrigger className="hover:bg-amber-200" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default AuthenticatedLayout;
