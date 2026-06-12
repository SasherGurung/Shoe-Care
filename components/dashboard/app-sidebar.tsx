"use client"

import * as React from "react"

import { NavDocuments } from "@/components/dashboard/nav-documents"
import { NavMain } from "@/components/dashboard/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon } from "lucide-react"
import { IoCalendarOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { LuPlug } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";

import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: (
        <LayoutDashboardIcon
        />
      ),
      items: [
        {
          items: "Ecommerce",
        },
        {
          items: "Analytics",
        },
        {
          items: "Logistics",
        },
        {
          items: "Sales",
        },
      ]
    },
    {
      title: "Ecommerce",
      url: "#",
      icon: (
        <IoCartOutline
        />
      ),
      items: [
        {
          items: "Products",
        },
        {
          items: "Add Products",
        },
        {
          items: "Billing",
        },
        {
          items: "Invoice",
        },
        {
          items: "Trasactions",
        },
      ]
    },
  ],
  NavDocument: [
    {
      title: "Calendar",
      url: "#",
      icon: (
        <IoCalendarOutline />
      ),
    },
    {
      title: "User Profile",
      url: "#",
      icon: (
        <CgProfile />
      ),
    },
    {
      title: "Email",
      url: "#",
      icon: (
        <AiOutlineMail />
      ),
      items: [
        {
          items: "Inbox",
        },
      ]
    },
    {
      title: "Authentication",
      url: "#",
      icon: (
        <LuPlug />
      ),
      items: [
        {
          items: "Sign In",
        },
        {
          items: "Sign UP",
        },
        {
          items: "Reset Password",
        },
      ]
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <span className="text-xl font-bold">Admin Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.NavDocument} />
      </SidebarContent>
    </Sidebar>
  )
}
