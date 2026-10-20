/** Downloads / documents types */

export type DownloadCategory =
  | "academic"
  | "regulatory"
  | "scholarship"
  | "form"
  | "prospectus"
  | "other";

export interface DownloadItem {
  id: string;
  title: string;
  category: DownloadCategory;
  href: string;
  fileType: "pdf" | "doc" | "xlsx" | "external";
  year?: string;
  description?: string;
  isExternal?: boolean;
}
