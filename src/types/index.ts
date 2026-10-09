export type UserRole = "admin" | "editor" | "viewer";

export type UserStatus = "active" | "disabled";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface RoleItem {
  id: number;
  name: string;
  code: string;
  description: string;
  permissions: string[];
}

export interface PageParams {
  page: number;
  pageSize: number;
}

export interface PageResult<T> {
  list: T[];
  total: number;
}

export type NoticeStatus = "published" | "offline";

export interface Notice {
  id: number;
  title: string;
  content: string;
  status: NoticeStatus;
  isPinned: boolean;
  publishedAt: string;
}

export type AiToolCategory = "chat" | "coding" | "image" | "search";

export type AiToolStatus = "active" | "disabled";

export interface AiTool {
  id: number;
  name: string;
  category: AiToolCategory;
  description: string;
  note: string;
  status: AiToolStatus;
  createdAt: string;
}
