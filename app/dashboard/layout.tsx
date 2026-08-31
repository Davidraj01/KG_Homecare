import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import "ckeditor5/ckeditor5.css";
import "./ckeditor.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}) {
  const auth = await getAdminSession();
  if (!auth.configured) redirect("/login?setup=1");
  if (!auth.user) redirect("/login");

  return (
    <DashboardShell userEmail={auth.user.email ?? ""}>
      {children}
    </DashboardShell>
  );
}
