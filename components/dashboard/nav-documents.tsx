"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { MdKeyboardArrowDown } from "react-icons/md"

type SubItem = {
  title: string
  url: string
}

type Item = {
  title: string
  url: string
  icon?: React.ReactNode
  items?: SubItem[]
}

export function NavDocuments({ items }: { items: Item[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documents</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const hasChildren = !!item.items?.length

            // ---------------- SIMPLE ITEM ----------------
            if (!hasChildren) {
              const isActive = pathname === item.url

              return (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} prefetch>
                    <SidebarMenuButton
                      className={
                        isActive
                          ? "bg-gray-100 text-blue-600"
                          : ""
                      }
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            }

            // ---------------- COLLAPSIBLE ITEM ----------------
            const isParentActive =
              item.items?.some((sub) => sub.url === pathname)

            return (
              <Collapsible
                key={item.title}
                defaultOpen={isParentActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.icon}
                      <span>{item.title}</span>

                      <MdKeyboardArrowDown className="ml-auto transition-transform duration-75 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="ml-8 mt-1 flex flex-col gap-1">
                    {item.items?.map((sub) => {
                      const isActive = pathname === sub.url

                      return (
                        <SidebarMenuItem key={sub.title}>
                          <Link href={sub.url} prefetch>
                            <SidebarMenuButton
                              className={
                                isActive
                                  ? "bg-gray-100 text-blue-600"
                                  : ""
                              }
                            >
                              {sub.title}
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      )
                    })}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}