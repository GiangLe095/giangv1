import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { PermissionProvider } from "@/components/providers/PermissionProvider";
import { ErrorProvider } from "@/components/providers/ErrorProvider";
import "@/app/globals.css";
import { SITE_TITLE } from "@/lib/constants/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  icons: "icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ErrorProvider>
          <AuthProvider>
            <PermissionProvider>
              <Toaster />
              <TanstackProvider>{children}</TanstackProvider>
            </PermissionProvider>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
