import { PERMISSIONS_RAW } from "@/lib/constants/permission";

export interface IPermissionData {
  id: string;
  name: string;
}

export type PermissionName = (typeof PERMISSIONS_RAW)[number]["name"];

// Utility types
type ReplaceDash<S extends string> = S extends `${infer H}-${infer T}` ? `${H}_${ReplaceDash<T>}` : S;
type Normalize<S extends string> = Uppercase<ReplaceDash<S>>;

type PermissionGroup = PermissionName extends `${infer G}:${string}` ? G : never;
type ActionOf<G extends string> = Extract<PermissionName, `${G}:${string}`> extends `${G}:${infer A}` ? A : never;

export type PermissionsObject = {
  [G in PermissionGroup as Normalize<G>]: {
    [A in ActionOf<G> as Uppercase<A>]: `${G}:${A}`;
  } & `${G}:${ActionOf<G>}`[];
} & PermissionName[];

const buildPermissionsObject = <T extends readonly { name: string }[]>(raw: T) => {
  const permissions = raw.map((p) => p.name);
  const groupMap = {} as any;

  for (const { name } of raw) {
    const [group, action] = name.split(":");
    const groupKey = group.replace(/-/g, "_").toUpperCase();
    const actionKey = action.toUpperCase();

    if (!groupMap[groupKey]) {
      groupMap[groupKey] = [];
    }

    groupMap[groupKey].push(name);
    groupMap[groupKey][actionKey] = name;
  }

  const final = Object.assign([...permissions], groupMap);
  return final as PermissionsObject;
};

export const PERMISSIONS = buildPermissionsObject(PERMISSIONS_RAW);