import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}