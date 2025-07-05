"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMenu } from "react-icons/hi";
import { ModeToggle } from "./ModeToggle";
import AuthLinks from "../authlinks/AuthLinks";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <>
      <Sheet>
        <SheetTrigger className="flex justify-center items-center">
          <HiMenu className="text-[32px] text-primary" />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link href="/" className="mt-32 mb-48 text-center">
            <h1 className="text-4xl font-semibold cursor-pointer text-primary">
              Blog.
            </h1>
          </Link>
          <nav className="flex flex-col justify-center items-center gap-8">
            {navItems.map((navItem, index) => {
              return (
                <Link
                  href={navItem.href}
                  key={index}
                  className={`${
                    navItem.href === pathname && "text-primary"
                  } text-[18px] capitalize hover:text-primary transition-all`}
                >
                  {navItem.label}
                </Link>
              );
            })}
            <AuthLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
