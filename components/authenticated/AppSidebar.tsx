"use client";

import {
  Calendar,
  Home,
  Inbox,
  LoaderCircle,
  LogOut,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSigningOut = () => {
    setIsSigningOut(true);
    signOut();
    setIsSigningOut(false);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleSigningOut}
          disabled={isSigningOut}
          className="space-x-4"
        >
          {isSigningOut && <LoaderCircle className="animate-spin" />}
          <LogOut /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
