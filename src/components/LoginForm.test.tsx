/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

beforeAll(() => {
  // window.location'ı test için mock'la
  delete (window as any).location;
  (window as any).location = { href: "" };
});

describe("LoginForm", () => {
  it("email ve şifre girildiğinde giriş çağrısı yapılır", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true, url: "/dashboard" });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/E-posta Adresi/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Şifre/i), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Giriş Yap/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", expect.objectContaining({
        email: "test@example.com",
        password: "Password123!",
      }));
    });
  });

  it("hatalı girişte uyarı mesajı gösterilir", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: "Invalid credentials" });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/E-posta Adresi/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Şifre/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Giriş Yap/i }));

    await screen.findByText(/E-posta veya şifre hatalı/i);
  });
});