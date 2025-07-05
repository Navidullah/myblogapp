// components/header/ClientHeaderWrapper.jsx
"use client";

import ClientHeader from "./ClientHeader";
import AuthLinks from "../authlinks/AuthLinks";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";

export default function ClientHeaderWrapper() {
  return (
    <div className="flex items-center gap-8">
      <ClientHeader />
      <AuthLinks />
      <ModeToggle />
      <div className="xl:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
