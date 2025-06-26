// src/app/forgot-password/page.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordPage from "./page";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
  ) as jest.Mock;
});

describe("ForgotPasswordPage", () => {
  it("form elemanlarını görüntüler", () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByPlaceholderText(/E-posta adresiniz/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /şifre sıfırlama linki gönder/i })).toBeInTheDocument();
  });

  it("şifre sıfırlama başarılı olursa mesaj gösterir", async () => {
    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByPlaceholderText(/E-posta adresiniz/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(screen.getByText(/şifre sıfırlama bağlantısı/i)).toBeInTheDocument()
    );
  });

  it("hatalı olursa uyarı gösterir", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByPlaceholderText(/E-posta adresiniz/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(screen.getByText(/bir hata oluştu/i)).toBeInTheDocument()
    );
  });
});
