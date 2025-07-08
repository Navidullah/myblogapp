export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""; // Running in browser — use relative URL
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Running on server
}
