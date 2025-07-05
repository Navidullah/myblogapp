"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div
      className="relative py-10 h-screen flex items-center justify-center px-4 
             bg-[url('/bg2.jpg')] bg-cover bg-center bg-no-repeat"
    >
      {/* Glowing Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-purple-500 opacity-30 dark:opacity-20 blur-[100px]"></div>
      </div>

      <Card className="h-[500px]  w-full max-w-sm shadow-2xl ">
        <CardHeader className="">
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle className="h-4 w-4" />
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <FaGithub className="h-4 w-4" />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
