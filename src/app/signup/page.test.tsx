// src/app/signup/page.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/hooks/useSignup", () => ({
  useSignup: () => ({
    signup: jest.fn().mockResolvedValue({ success: true }),
    isLoading: false,
    error: "",
    success: "Başarılı",
  }),
}));

describe("SignupPage", () => {
  it("başlık ve formu görüntüler", () => {
    render(<SignupPage />);

    expect(screen.getByRole("heading", { name: "Kayıt Ol" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta")).toBeInTheDocument();
    expect(screen.getByLabelText("Şifre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /kayıt ol/i })).toBeInTheDocument();
  });

  it("geçersiz e-posta hatası gösterir", async () => {
    render(<SignupPage />);

    const emailInput = screen.getByLabelText("E-posta");
    fireEvent.change(emailInput, { target: { value: "yanlışmail" } });

    const passwordInput = screen.getByLabelText("Şifre");
    fireEvent.change(passwordInput, { target: { value: "Weakpass1!" } });

    const button = screen.getByRole("button", { name: /kayıt ol/i });
    expect(button).toBeDisabled();
    expect(screen.getByText("Geçerli bir e-posta adresi giriniz")).toBeInTheDocument();
  });

  it("başarılı kayıt sonrası yönlendirme mesajı gösterir", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText("E-posta"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Şifre"), {
      target: { value: "StrongPass1!" },
    });

    const button = screen.getByRole("button", { name: /kayıt ol/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Başarılı")).toBeInTheDocument();
    });
  });
});
