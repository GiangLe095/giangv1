import { IRoleData } from "@/types/role";

export interface IAuthData {
  id: string;
  username: string;
  fullname: string;
  phone?: string;
  avatarUrl?: string;
  role: IRoleData;
  accessToken?: string;
  refreshToken?: string;
}
