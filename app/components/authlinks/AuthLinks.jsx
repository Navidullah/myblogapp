// components/authlinks/AuthLinks.jsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const AuthLinks = ({ pathname }) => {
  const { data: session, status } = useSession();

  const linkClasses = (href) =>
    `text-[18px] transition-all duration-300 px-2 py-1 ${
      pathname === href ? "text-primary border-primary" : "hover:text-primary"
    }`;

  if (status === "loading") return null; // Optional: or show a loader

  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <span
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[18px] px-2 py-1 hover:text-primary cursor-pointer"
          >
            Logout
          </span>
        </>
      ) : (
        <Link href="/login" className={linkClasses("/login")}>
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
