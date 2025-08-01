import { IRoleData } from "@/types/role";

export interface IAdminData {
  id: string;
  username: string;
  fullname: string;
  password?: string;
  phone?: string;
  avatarUrl?: string;
  role: IRoleData;
}
