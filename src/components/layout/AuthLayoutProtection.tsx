"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_REDIRECT_AFTER_AUTH } from "@/lib/constants/route";
import { getAccessToken } from "@/lib/utils";
import Loading from "@/components/loading";


interface AuthLayoutProtectionProps {
    children: React.ReactNode;
}

export default function AuthLayoutProtection ({children}: AuthLayoutProtectionProps) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            router.replace(DEFAULT_REDIRECT_AFTER_AUTH);
        } else {
            setIsMounted(true);
        }
        return () => setIsMounted(true)
    }, [router]);


  

    if (!isMounted) return <Loading />;

    return <>{children}</>;
}