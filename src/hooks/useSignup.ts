import { useState } from "react";

interface SignupCredentials {
  email: string;
  password: string;
}

interface SignupResult {
  success: boolean;
  error?: string;
}

interface ErrorResponse {
  description?: {
    policy?: unknown;
  };
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (credentials: SignupCredentials): Promise<SignupResult> => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
        return { success: true };
      } else {
        const errorMessage = getErrorMessage(data.error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch {
      const errorMessage = "Sunucudan beklenmeyen bir cevap alındı.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, success };
};

const getErrorMessage = (error: string | ErrorResponse | unknown): string => {
  if (typeof error === "object" && error !== null && "description" in error) {
    const errorObj = error as ErrorResponse;
    if (errorObj.description?.policy) {
      return "Şifreniz güvenlik gereksinimlerini karşılamıyor.";
    }
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  return "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.";
};