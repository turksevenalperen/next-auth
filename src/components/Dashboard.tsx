"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.userRole === "admin") {
      router.replace("/admin");
    }
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status === "loading" || session?.userRole === "admin") {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Hoşgeldin {session?.user?.name || session?.user?.email}</h1>
      <p>E-posta: {session?.user?.email}</p>
      <p>Rol: {session?.userRole}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Çıkış Yap.
      </button>
    </div>
  );
}
