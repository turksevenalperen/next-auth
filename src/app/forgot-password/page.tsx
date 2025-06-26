// src/app/forgot-password/page.tsx
"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    } else {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-posta adresiniz"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Şifre Sıfırlama Linki Gönder
      </button>
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}