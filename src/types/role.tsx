import { IPermissionData } from "@/types/permission";

export interface IRoleData {
  id: string;
  name: string;
  permissions: IPermissionData[];
  default?: boolean;
}
