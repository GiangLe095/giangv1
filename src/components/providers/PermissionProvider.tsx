"use client";

import { PERMISSIONS, PermissionName, PermissionsObject } from "@/types/permission";
import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useAuth } from "./AuthProvider";

type PermissionContextType = {
  PERMISSIONS: PermissionsObject;
  canAccess: ({
    resource,
    onAccessForbidden,
  }: {
    resource: PermissionName | PermissionName[];
    onAccessForbidden?: () => void;
  }) => boolean;
  canAccessAny: (resources: PermissionName[]) => boolean;
  canAccessAll: (resources: PermissionName[]) => boolean;
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const canAccess = useCallback(
    ({
      resource,
      onAccessForbidden,
    }: {
      resource: PermissionName | PermissionName[];
      onAccessForbidden?: () => void;
    }) => {
      if (!user) {
        onAccessForbidden?.();
        return false;
      }

      if (Array.isArray(resource)) {
        const canAccess = resource.every((r) => user.role.permissions.find((p) => p.name === r));
        if (!canAccess) {
          onAccessForbidden?.();
        }
        return canAccess;
      }

      const canAccess = !!user.role.permissions.find((p) => p.name === resource);
      if (!canAccess) {
        onAccessForbidden?.();
      }
      return canAccess;
    },
    [user],
  );

  const canAccessAny = useCallback(
    (resources: PermissionName[]) => {
      return resources.some((resource) => user?.role.permissions.find((p) => p.name === resource));
    },
    [user],
  );

  const canAccessAll = useCallback(
    (resources: PermissionName[]) => {
      return resources.every((resource) => user?.role.permissions.find((p) => p.name === resource));
    },
    [user],
  );

  const value = useMemo(
    () => ({
      PERMISSIONS,
      canAccess,
      canAccessAny,
      canAccessAll,
    }),
    [canAccess, canAccessAny, canAccessAll],
  );

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
};

/**
 * A custom React hook that provides permission-based access control for the current authenticated user.
 *
 * This hook gives access to a structured permission map (`PERMISSIONS`) and utility functions
 * to evaluate whether the user can access specific resources.
 *
 * @returns An object containing:
 * - `PERMISSIONS`: A hierarchical object of all available permissions, grouped by module. Supports auto-completion and compile-time safety.
 * - `canAccess`: Checks whether the user has a specific permission or set of permissions. Optionally triggers a callback if access is denied.
 * - `canAccessAny`: Returns true if the user has **at least one** permission in the provided list.
 * - `canAccessAll`: Returns true if the user has **all** permissions in the provided list.
 *
 * @example
 * // Access the full list of permissions
 * const { PERMISSIONS } = usePermissions();
 * const allPermissions = PERMISSIONS; // → ["users:create", "users:update", ...]
 * const userPermissions = PERMISSIONS.USERS; // → ["users:create", "users:update", "users:delete", "users:read"]
 * const userCreatePermission = PERMISSIONS.USERS.CREATE; // → "users:create"
 *
 * @example
 * // Check if the user has a specific permission
 * const { canAccess, PERMISSIONS } = usePermissions();
 * const canCreateUser = canAccess({ resource: PERMISSIONS.USERS.CREATE }); // → true or false
 *
 * // You can also pass the raw string (not recommended)
 * const canUpdateUser = canAccess({ resource: "users:update" }); // → true or false
 *
 * @example
 * // Check if user has access to all permissions in a group
 * const hasFullAccessToUsers = canAccess({ resource: PERMISSIONS.USERS }); // → true or false
 *
 * @example
 * // Check if user has any/all among multiple permissions
 * const canAccessAny = canAccessAny(["users:create", "users:read"]); // → true if has at least one
 * const canAccessAll = canAccessAll(["users:create", "users:read"]); // → true only if has both
 *
 * @throws Error if used outside of a <PermissionProvider>
 */
export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};
