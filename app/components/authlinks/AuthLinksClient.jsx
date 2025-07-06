// app/components/authlinks/AuthLinksClient.jsx
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AuthLinksClient({ session }) {
  return (
    <>
      {session?.user ? (
        <>
          <Link
            href="/dashboard"
            className="text-[18px] px-2 py-1 hover:text-primary"
          >
            Dashboard
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[18px] px-2 py-1 hover:text-primary"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="text-[18px] px-2 py-1 hover:text-primary"
        >
          Login
        </Link>
      )}
    </>
  );
}
