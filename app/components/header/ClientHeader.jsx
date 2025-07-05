"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import AuthLinks from "../authlinks/AuthLinks";
//import { ModeToggle } from "./ModeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const ClientHeader = () => {
  const pathname = usePathname();

  return (
    <div className=" h-full">
      <div className="flex justify-between items-center h-full">
        {/* Navigation Links */}
        <div className="hidden xl:flex  justify-around items-center gap-8">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[18px] transition-all duration-300 px-2 py-1 ${
                  isActive
                    ? "text-primary border-primary"
                    : "hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <AuthLinks pathname={pathname} />
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
