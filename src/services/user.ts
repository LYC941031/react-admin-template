import { users } from '../mock/data'
import type { PageParams, PageResult, User, UserRole } from '../types'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// 内存 mock 数据库（真实项目替换为 API 调用，见 README「接入真实后端」）
let db: User[] = [...users]

export interface UserQuery extends PageParams {
  keyword?: string
  role?: UserRole
}

export async function fetchUsers(query: UserQuery): Promise<PageResult<User>> {
  await delay()
  let list = [...db]
  if (query.keyword) {
    const kw = query.keyword.trim().toLowerCase()
    list = list.filter(
      (u) => u.name.toLowerCase().includes(kw) || u.username.toLowerCase().includes(kw),
    )
  }
  if (query.role) {
    list = list.filter((u) => u.role === query.role)
  }
  const total = list.length
  const start = (query.page - 1) * query.pageSize
  return { list: list.slice(start, start + query.pageSize), total }
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  await delay()
  const user: User = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString().slice(0, 10),
  }
  db = [user, ...db]
  return user
}

export async function updateUser(id: number, data: Partial<User>): Promise<void> {
  await delay()
  db = db.map((u) => (u.id === id ? { ...u, ...data } : u))
}

export async function deleteUser(id: number): Promise<void> {
  await delay()
  db = db.filter((u) => u.id !== id)
}
