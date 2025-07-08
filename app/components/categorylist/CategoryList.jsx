// No "use client" here → this is a Server Component
//import { getBaseUrl } from "@/utils/getBaseUrl";
import ClientCategoryList from "./ClientCategoryList";

async function getData() {
  //const baseUrl = getBaseUrl();

  const res = await fetch("/api/categorie", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function CategoryList() {
  const data = await getData();
  return <ClientCategoryList data={data} />;
}
