// No "use client" here → this is a Server Component
import { getBaseUrl } from "@/utils/getBaseUrl";
import ClientCategoryList from "./ClientCategoryList";

async function getData() {
  const baseUrl = getBaseUrl();
  if (baseUrl === "https://blogapp-one-peach.vercel.app") {
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } else {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  }
}

export default async function CategoryList() {
  const data = await getData();
  return <ClientCategoryList data={data} />;
}
