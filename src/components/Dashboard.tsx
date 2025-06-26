"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LogOut, Loader2 } from "lucide-react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.userRole === "admin") {
      router.replace("/admin")
    }
    if (status === "unauthenticated") {
      router.replace("/")
    }
  }, [status, session, router])

  if (status === "loading" || session?.userRole === "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="outline"
            size="sm"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-center">Kullanıcı Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="text-sm text-gray-500 font-medium">Kullanıcı</label>
              <p className="font-semibold text-gray-800 text-lg mt-1">{session?.user?.name || session?.user?.email}</p>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <label className="text-sm text-gray-500 font-medium">Hesap Durumu</label>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-semibold text-green-600">Aktif</p>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <label className="text-sm text-gray-500 font-medium">Kullanıcı Rolü</label>
              <div className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {session?.userRole}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
