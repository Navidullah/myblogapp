// utils/auth.js
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

// Auth.js v5 style export
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
