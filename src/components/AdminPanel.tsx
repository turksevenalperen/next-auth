"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.userRole !== "admin") {
      router.replace("/unauthorized");
    }
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status === "loading" || (status === "authenticated" && session?.userRole !== "admin")) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
        <p className="text-gray-600">Yalnızca yetkili kullanıcılar görebilir.</p>
        <div className="mt-4 text-left">
          <p><b>E-posta:</b> {session?.user?.email}</p>
          <p><b>Rol:</b> {session?.userRole}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Çıkış Yap.
        </button>
      </div>
    </div>
  );
}