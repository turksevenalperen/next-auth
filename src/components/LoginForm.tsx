"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, LogIn, UserPlus, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: "/dashboard", // Bunu dinamik yapacağız!
    connection: "Username-Password-Authentication",
  });

  setIsLoading(false);

  if (res?.error) {
    setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
  }
  if (res?.ok) {
    // Burada kullanıcı rolünü bilmiyoruz, o yüzden /dashboard'a yönlendiriyoruz.
    // Ama middleware anında admini /admin'e atacak, dashboard hiç render edilmeyecek!
    window.location.href = res.url || "/dashboard";
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Hoş Geldiniz</CardTitle>
          <CardDescription className="text-gray-600">Hesabınıza giriş yapın ve devam edin</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-posta Adresi
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Giriş yapılıyor...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Giriş Yap
                </div>
              )}
            </Button>

            <div className="text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Şifrenizi mi unuttunuz?
              </Link>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Separator />

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Henüz hesabınız yok mu?</p>
            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Kayıt Ol
              </Link>
            </Button>
          </div>

        </CardFooter>
      </Card>
    </div>
  );
}