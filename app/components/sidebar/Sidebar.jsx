// components/sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaFileAlt,
  FaPen,
  FaTags,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: FaHome },
  { href: "/dashboard/posts", label: "Posts", icon: FaFileAlt },
  { href: "/dashboard/write", label: "Write Post", icon: FaPen },
  { href: "/dashboard/categories", label: "Categories", icon: FaTags },
  { href: "/dashboard/comments", label: "Comments", icon: FaCommentDots },
  { href: "/dashboard/settings", label: "Settings", icon: FaCog },
  { href: "/logout", label: "Sign Out", icon: FaSignOutAlt },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 h-screen border-r  bg-white/10 dark:bg-gray-900/20 
        backdrop-blur-md 
        border-b border-black/10 dark:border-gray-700/30 px-4 py-6"
    >
      <div className="text-2xl font-bold mb-8">📚 Blog Admin</div>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary hover:text-white",
              pathname === href
                ? "bg-primary text-white"
                : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
