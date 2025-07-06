// app/components/authlinks/AuthLinksServer.jsx
import { auth } from "@/utils/auth";
import AuthLinksClient from "./AuthLinksClient";

export default async function AuthLinksServer() {
  const session = await auth(); // Safe to call here (server component)
  return <AuthLinksClient session={session} />;
}
