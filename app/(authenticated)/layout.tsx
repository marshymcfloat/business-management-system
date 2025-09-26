import AppSidebar from "@/components/authenticated/AppSidebar";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <TanstackProvider>
          <AppSidebar />
          <main className="h-screen bg-amber-100 w-full p-8 relative">
            <SidebarTrigger className="hover:bg-amber-200 absolute top-0 left-0" />

            {children}
          </main>
        </TanstackProvider>
      </SidebarProvider>
    </>
  );
};

export default AuthenticatedLayout;
