// src/components/AdminPanel.test.tsx
import { render, screen } from "@testing-library/react";
import AdminPanel from "./AdminPanel";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe("AdminPanel", () => {
  it("admin olmayan kullanıcıyı yükleme ekranında tutar", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { email: "test@example.com" }, userRole: "user" },
    });

    render(<AdminPanel />);
    expect(screen.getByText(/Yükleniyor/i)).toBeInTheDocument();
  });

  it("admin kullanıcı bilgilerini gösterir", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { email: "admin@example.com" }, userRole: "admin" },
    });

    render(<AdminPanel />);
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument();
expect(screen.getAllByText(/admin/i).length).toBeGreaterThan(0);
  });
});
