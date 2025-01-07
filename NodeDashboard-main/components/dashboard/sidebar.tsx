"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart,
  BookOpen,
  Users,
  Activity,
  HelpCircle,
  Settings,
  Map,
  X,
  Menu
} from "lucide-react";

const navigation = [
  { name: "Reports", href: "/dashboard", icon: BarChart },
  { name: "Library", href: "/dashboard/library", icon: BookOpen },
  { name: "People", href: "/dashboard/people", icon: Users },
  { name: "Activities", href: "/dashboard/activities", icon: Activity },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  { name: "Get Started", href: "/dashboard/get-started", icon: Map },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view on client-side
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Typical mobile breakpoint
    };

    // Check initial load
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Mobile view with toggle
  if (isMobile) {
    return (
      <>
        {/* Mobile toggle button */}
        <button 
          onClick={toggleSidebar} 
          className="fixed top-4 right-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40" 
            onClick={toggleSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <div 
          className={cn(
            "fixed top-0 left-0 h-full w-[240px] bg-card border-r transition-transform duration-300 z-50",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-8 px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">TESLA</h1>
            <button onClick={toggleSidebar} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleSidebar}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </>
    );
  }

  // Desktop view (original implementation)
  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-card px-3 py-4">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold">TESLA</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}