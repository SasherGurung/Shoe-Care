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
      url: "/dashboard/ecommerce",
      icon: <LayoutDashboardIcon />,
      items: [
        {
          title: "Ecommerce",
          url: "#",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Logistics",
          url: "/dashboard/logistics",
        },
        {
          title: "Sales",
          url: "/dashboard/sales",
        },
      ],
    },
    {
      title: "Ecommerce",
      url: "/dashboard/ecommerce",
      icon: <IoCartOutline />,
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Add Products",
          url: "/dashboard/add-products",
        },
        {
          title: "Billing",
          url: "/dashboard/billing",
        },
        {
          title: "Invoice",
          url: "/dashboard/invoice",
        },
        {
          title: "Transactions",
          url: "/dashboard/transactions",
        },
      ],
    },
  ],

  NavDocument: [
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: <IoCalendarOutline />,
    },
    {
      title: "User Profile",
      url: "/dashboard/profile",
      icon: <CgProfile />,
    },
    {
      title: "Email",
      url: "/dashboard/email",
      icon: <AiOutlineMail />,
      items: [
        {
          title: "Inbox",
          url: "/dashboard/email/inbox",
        },
      ],
    },
    {
      title: "Authentication",
      url: "/dashboard/auth",
      icon: <LuPlug />,
      items: [
        {
          title: "Sign In",
          url: "/dashboard/auth/sign-in",
        },
        {
          title: "Sign Up",
          url: "/dashboard/auth/sign-up",
        },
        {
          title: "Reset Password",
          url: "/dashboard/auth/reset-password",
        },
      ],
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
              <Link href="/dashboard/ecommerce">
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
