"use client";

import React from "react";
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: {
      title: string;
    }[];
  }[];
}) {
  const [active, setActive] = React.useState<string>("");

  return (
    // Main-Nav
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.title} className="group/collapsible">
  <SidebarMenuItem>

    <CollapsibleTrigger asChild>
      <SidebarMenuButton
        onClick={() => setActive(item.title)}
      >
        {item.icon}
        <span>{item.title}</span>

        <MdKeyboardArrowDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
      </SidebarMenuButton>
    </CollapsibleTrigger>

    {item.items && (
      <CollapsibleContent>
        <div className="ml-8 mt-1 flex flex-col gap-1">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={`/dashboard/${subItem.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <SidebarMenuButton
                className={cn(
                  active === subItem.title && "bg-gray-200 text-blue-600"
                )}
                onClick={() => setActive(subItem.title)}
              >
                {subItem.title}
              </SidebarMenuButton>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    )}

  </SidebarMenuItem>
</Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
