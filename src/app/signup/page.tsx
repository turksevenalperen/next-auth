"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"
import { usePasswordValidation } from "@/hooks/usePasswordValidation"
import { useSignup } from "@/hooks/useSignup"

const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
  <div className="flex items-center gap-2 text-sm">
    {isValid ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
    <span className={isValid ? "text-green-600" : "text-red-600"}>{text}</span>
  </div>
)

const PasswordRequirements = ({ validation }: { validation: ReturnType<typeof usePasswordValidation> }) => (
  <div className="space-y-2 p-3 bg-gray-50 rounded-md">
    <p className="text-sm font-medium text-gray-700">Şifre gereksinimleri:</p>
    <ValidationItem isValid={validation.hasMinLength} text="En az 8 karakter" />
    <ValidationItem isValid={validation.hasUpperCase} text="En az 1 büyük harf (A-Z)" />
    <ValidationItem isValid={validation.hasLowerCase} text="En az 1 küçük harf (a-z)" />
    <ValidationItem isValid={validation.hasNumber} text="En az 1 sayı (0-9)" />
    <ValidationItem isValid={validation.hasSpecialChar} text="En az 1 özel karakter (!@#$%^&*)" />
  </div>
)

const ErrorAlert = ({ error }: { error: string }) => (
  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
    {error}
  </div>
)

const SuccessAlert = ({ message }: { message: string }) => (
  <div className="text-green-500 text-sm bg-green-50 p-3 rounded-md border border-green-200">
    {message}
  </div>
)

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const passwordValidation = usePasswordValidation(password)
  const { signup, isLoading, error, success } = useSignup()

  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isFormValid = isEmailValid && passwordValidation.isValid

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    const result = await signup({ email, password })
    
    if (result.success) {
      setTimeout(() => router.push("/"), 1500)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Kayıt Ol</h1>
        <p className="text-muted-foreground">Hesabınızı oluşturun</p>
      </div>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            required
            disabled={isLoading}
            aria-describedby={!isEmailValid && email.length > 0 ? "email-error" : undefined}
          />
          {!isEmailValid && email.length > 0 && (
            <p id="email-error" className="text-sm text-red-600">
              Geçerli bir e-posta adresi giriniz
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Şifre</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            required
            disabled={isLoading}
            aria-describedby={password.length > 0 ? "password-requirements" : undefined}
          />
        </div>

        {/* Password Requirements */}
        {password.length > 0 && (
          <div id="password-requirements">
            <PasswordRequirements validation={passwordValidation} />
          </div>
        )}

        {/* Error and Success Messages */}
        {error && <ErrorAlert error={error} />}
        {success && <SuccessAlert message={success} />}

        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full ${!isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Kayıt yapılıyor...
            </span>
          ) : isFormValid ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Kayıt Ol
            </span>
          ) : (
            "Kayıt Ol"
          )}
        </Button>
      </form>
    </div>
  )
}