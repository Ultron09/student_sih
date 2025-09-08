import {
  Book,
  Briefcase,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/aptitude-test", label: "Aptitude Test", icon: Lightbulb },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/colleges", label: "Colleges", icon: Building2 },
  { href: "/career-paths", label: "Career Paths", icon: Briefcase },
  { href: "/timeline", label: "Timeline", icon: CalendarDays },
  { href: "/resources", label: "Resources", icon: Book },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-background/50 px-4 backdrop-blur-sm md:px-6 sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/32/32" data-ai-hint="student portrait" alt="User avatar" width={32} height={32}/>
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="#">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="#">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="#">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
