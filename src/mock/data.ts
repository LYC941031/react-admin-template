import type {
  AiTool,
  Notice,
  RoleItem,
  User,
  UserRole,
  UserStatus,
} from "../types";

export const roles: RoleItem[] = [
  {
    id: 1,
    name: "管理员",
    code: "admin",
    description: "拥有全部权限",
    permissions: ["*"],
  },
  {
    id: 2,
    name: "编辑",
    code: "editor",
    description: "内容编辑权限",
    permissions: ["user:read", "user:write"],
  },
  {
    id: 3,
    name: "访客",
    code: "viewer",
    description: "只读权限",
    permissions: ["user:read"],
  },
];

const roleList: UserRole[] = ["admin", "editor", "viewer"];

export const users: User[] = Array.from({ length: 23 }, (_, i) => {
  const id = i + 1;
  const status: UserStatus = id % 5 === 0 ? "disabled" : "active";
  return {
    id,
    name: `用户${id}`,
    username: `user${id}`,
    email: `user${id}@example.com`,
    role: roleList[id % 3],
    status,
    createdAt: new Date(2026, 0, id).toISOString().slice(0, 10),
  };
});

export const notices: Notice[] = [
  {
    id: 1,
    title: "系统升级通知",
    content: "系统将于本周六凌晨进行升级维护，请提前保存工作。",
    status: "published",
    isPinned: true,
    publishedAt: "2026-10-01",
  },
  {
    id: 2,
    title: "V2.0 版本发布公告",
    content: "V2.0 已正式上线，欢迎体验新功能。",
    status: "published",
    isPinned: false,
    publishedAt: "2026-10-03",
  },
  {
    id: 3,
    title: "国庆假期值班安排",
    content: "假期值班表已发布，请相关同事查看。",
    status: "offline",
    isPinned: false,
    publishedAt: "2026-09-28",
  },
];

export const aiTools: AiTool[] = [
  {
    id: 1,
    name: "ChatGPT",
    category: "chat",
    description: "通用对话与内容生成工具",
    note: "适合需求澄清、文案生成和总结提炼，适用于日常协作。",
    status: "active",
    createdAt: "2026-10-01",
  },
  {
    id: 2,
    name: "GitHub Copilot",
    category: "coding",
    description: "代码补全和编程助手",
    note: "适合前端、后端和脚本开发，能提升编码效率。",
    status: "active",
    createdAt: "2026-09-22",
  },
  {
    id: 3,
    name: "Midjourney",
    category: "image",
    description: "AI 图像生成工具",
    note: "用于营销素材、概念图和创意设计，适合视觉资产生成。",
    status: "disabled",
    createdAt: "2026-08-18",
  },
  {
    id: 4,
    name: "Perplexity",
    category: "search",
    description: "带引用的 AI 搜索工具",
    note: "适合进行调研和快速查找行业信息，输出带来源引用。",
    status: "active",
    createdAt: "2026-09-10",
  },
];
