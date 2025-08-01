import AuthLayoutProtection from "@/components/layout/AuthLayoutProtection";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayoutProtection>{children}</AuthLayoutProtection>;
}
