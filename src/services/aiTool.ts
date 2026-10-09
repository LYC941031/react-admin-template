import { aiTools } from "../mock/data";
import type {
  AiTool,
  AiToolCategory,
  AiToolStatus,
  PageParams,
  PageResult,
} from "../types";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let db: AiTool[] = [...aiTools];

export interface AiToolQuery extends PageParams {
  keyword?: string;
  category?: AiToolCategory;
  status?: AiToolStatus;
}

export async function fetchAiTools(
  query: AiToolQuery,
): Promise<PageResult<AiTool>> {
  await delay();
  let list = [...db];

  if (query.keyword) {
    const keyword = query.keyword.trim().toLowerCase();
    list = list.filter(
      (tool) =>
        tool.name.toLowerCase().includes(keyword) ||
        tool.description.toLowerCase().includes(keyword) ||
        tool.note.toLowerCase().includes(keyword),
    );
  }

  if (query.category) {
    list = list.filter((tool) => tool.category === query.category);
  }

  if (query.status) {
    list = list.filter((tool) => tool.status === query.status);
  }

  const total = list.length;
  const start = (query.page - 1) * query.pageSize;

  return { list: list.slice(start, start + query.pageSize), total };
}

export async function createAiTool(
  data: Omit<AiTool, "id" | "createdAt">,
): Promise<AiTool> {
  await delay();
  const tool: AiTool = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  db = [tool, ...db];
  return tool;
}

export async function updateAiTool(
  id: number,
  data: Partial<AiTool>,
): Promise<void> {
  await delay();
  db = db.map((tool) => (tool.id === id ? { ...tool, ...data } : tool));
}

export async function deleteAiTool(id: number): Promise<void> {
  await delay();
  db = db.filter((tool) => tool.id !== id);
}
