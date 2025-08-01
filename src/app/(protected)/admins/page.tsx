import { Metadata } from "next";
import { SITE_TITLE } from "@/lib/constants/config";
import AdminPage from "@/components/admin";

export const metadata: Metadata = {
  title: `Boss - ${SITE_TITLE}`
  };

export default function Page() {
  return <AdminPage />

}