/*import React from "react";
import ClientHeader from "./ClientHeader";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header
      className="
        fixed top-0 w-full z-50
        py-4 xl:py-6 
        bg-white/20 dark:bg-gray-900/20 
        backdrop-blur-md 
        border-b border-black/10 dark:border-gray-700/30
      "
    >
      <div className="wrapper flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logodesign.png"
            width={200}
            height={200}
            alt="logo"
            className="text-3xl"
          />
        </Link>
        <div className="flex items-center gap-8">
          <ClientHeader />
          <ModeToggle />
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;*/
// app/components/header/Header.jsx

import ClientHeader from "./ClientHeader";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";
//import AuthLinks from "../authlinks/AuthLinks"; // ✅ Server-only import
import AuthLinksServer from "../authlinks/AuthLinksServer";

export default async function Header() {
  return (
    <header
      className="
        fixed top-0 w-full z-50
        py-4 xl:py-6 
        bg-white/20 dark:bg-gray-900/20 
        backdrop-blur-md 
        border-b border-black/10 dark:border-gray-700/30
      "
    >
      <div className="wrapper flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logodesign.png"
            width={200}
            height={200}
            alt="logo"
            className="text-3xl"
          />
        </Link>

        <div className="flex items-center gap-8">
          <ClientHeader />
          <AuthLinksServer />
          <ModeToggle />
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
/*
// components/header/Header.jsx
import Link from "next/link";
import Image from "next/image";
import ClientHeaderWrapper from "./ClientHeaderWrapper";

export default function Header() {
  return (
    <header
      className="fixed top-0 w-full z-50 py-4 xl:py-6 
        bg-white/20 dark:bg-gray-900/20 
        backdrop-blur-md border-b border-black/10 dark:border-gray-700/30"
    >
      <div className="wrapper flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logodesign.png"
            width={200}
            height={200}
            alt="logo"
            className="text-3xl"
          />
        </Link>

        {/* ✅ All client-only logic moved inside *
        <ClientHeaderWrapper />
      </div>
    </header>
  );
}
*/
