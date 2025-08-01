"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { authApi } from "@/apis/auth/auth.api";
import { loginApi } from "@/apis/auth/login.api";
import { logoutApi } from "@/apis/auth/logout.api";
import { updatePasswordApi } from "@/apis/auth/updatePassword";
import { updateAdminApi } from "@/apis/admin/updateAdmin.api";
import Loading from "@/components/loading";
import { IAuthData } from "@/types/auth"
import {
  AUTH_ROUTES,
  DEFAULT_REDIRECT_AFTER_AUTH,
  DEFAULT_REDIRECT_IF_NOT_AUTH,
  PUBLIC_ROUTES,
} from "@/lib/constants/route";
import { setAccessToken } from "@/lib/utils";

type AuthContextType = {
  user: IAuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (data: { id: string; fullname?: string; phone?: string; avatarUrl?: string }) => Promise<void>;
  updatePassword: (data: { id: string; oldPassword: string; newPassword: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<IAuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(pathname !== DEFAULT_REDIRECT_IF_NOT_AUTH);
  const isAuthenticated = !!user;
  const hasTriedRefresh = useRef(false);

  const refreshUser = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await authApi();
      const userData = response.toAuthData();
      setUser(userData);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!PUBLIC_ROUTES.includes(pathname) && !AUTH_ROUTES.includes(pathname)) {
        if (hasTriedRefresh.current) return;
        hasTriedRefresh.current = true;
        await refreshUser();
      }
    };

    checkAuth();
  }, [pathname, refreshUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const response = await loginApi({ username, password });
        const { accessToken, ...userData } = response.toAuthData();
        setUser(userData);
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn trở lại!",
          duration: 3000,
        });
        setAccessToken(accessToken!, 30 * 24 * 60 * 60); // 30 days
        router.push(DEFAULT_REDIRECT_AFTER_AUTH);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra thông tin đăng nhập",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setUser(null);
      await logoutApi();
      setAccessToken("", 0);
      router.push(DEFAULT_REDIRECT_IF_NOT_AUTH);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const updateUser = useCallback(
    async (data: { id: string; fullname?: string; phone?: string; address?: string; avatarUrl?: string }) => {
      setLoading(true);
      try {
        const response = await updateAdminApi({
          id: data.id,
          data: {
            fullname: data.fullname,
            phone: data.phone,
            avatarUrl: data.avatarUrl,
          },
        });
        const userData = response.toAuthData();
        setUser(userData);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updatePassword = useCallback(async (data: { id: string; oldPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      await updatePasswordApi({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading: loading,
    login,
    logout,
    refreshUser,
    updateUser,
    updatePassword,
  };

  if (isRefreshing || (!isRefreshing && !user && pathname !== DEFAULT_REDIRECT_IF_NOT_AUTH)) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
