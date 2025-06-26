// src/app/page.tsx (veya /src/app/(auth)/page.tsx gibi olabilir)
import { authConfig } from "@/lib/auth.config";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if (session?.userRole === "admin") {
    redirect("/admin");
  }

  if (session?.userRole === "user") {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
