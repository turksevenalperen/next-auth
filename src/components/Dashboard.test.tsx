// src/components/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe("Dashboard", () => {
  it("admin ise yönlendirme yapılır (placeholder olarak gösterim test edilir)", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { name: "Admin" }, userRole: "admin" },
    });

    render(<Dashboard />);
    expect(screen.getByText(/Yükleniyor/i)).toBeInTheDocument();
  });

  it("kullanıcı panelini doğru render eder", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { name: "Test Kullanıcı" }, userRole: "user" },
    });

    render(<Dashboard />);
    expect(screen.getByText("Kullanıcı Bilgileri")).toBeInTheDocument();
    expect(screen.getByText("Test Kullanıcı")).toBeInTheDocument();
    expect(screen.getByText("Aktif")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
  });
});
