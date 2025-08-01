"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import AccessForbidden from "@/components/access-forbiden";
import { AuthError, PermissionError } from "@/types/error";
import { setAccessToken } from "@/lib/utils";
import { DEFAULT_REDIRECT_IF_NOT_AUTH } from "@/lib/constants/route";

interface Props {
  children: ReactNode;
}

export function ErrorProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPermissionError, setIsPermissionError] = useState<boolean>(false);

  useEffect(() => {
    const handleGlobalAuthError = (event: PromiseRejectionEvent) => {
      const error = event?.reason;
      event.preventDefault();
      if (error instanceof AuthError || error.code === "ERR_NETWORK") {
        toast({
          title: error.message,
          description: "Vui lòng đăng nhập lại",
          variant: "destructive",
          duration: 3000,
        });
        setAccessToken("", 0);
        if (pathname !== DEFAULT_REDIRECT_IF_NOT_AUTH) {
          router.push(DEFAULT_REDIRECT_IF_NOT_AUTH);
        }
      }

      if (error instanceof PermissionError) {
        setIsPermissionError(true);
      }
    };

    window.addEventListener("unhandledrejection", handleGlobalAuthError);
    return () => {
      window.removeEventListener("unhandledrejection", handleGlobalAuthError);
    };
  }, [pathname, router]);

  return <>{isPermissionError ? <AccessForbidden /> : children}</>;
}
