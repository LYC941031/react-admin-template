import { notices } from '../mock/data'
import type { Notice, NoticeStatus, PageParams, PageResult } from '../types'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

let db: Notice[] = [...notices]

export interface NoticeQuery extends PageParams {
  keyword?: string
  status?: NoticeStatus
}

export async function fetchNotices(query: NoticeQuery): Promise<PageResult<Notice>> {
  await delay()
  let list = [...db]
  if (query.keyword) {
    const kw = query.keyword.trim().toLowerCase()
    list = list.filter((n) => n.title.toLowerCase().includes(kw))
  }
  if (query.status) {
    list = list.filter((n) => n.status === query.status)
  }
  // 置顶优先，其次按发布时间倒序
  list.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return b.publishedAt.localeCompare(a.publishedAt)
  })
  const total = list.length
  const start = (query.page - 1) * query.pageSize
  return { list: list.slice(start, start + query.pageSize), total }
}

export async function createNotice(data: Omit<Notice, 'id' | 'publishedAt'>): Promise<Notice> {
  await delay()
  const notice: Notice = {
    ...data,
    id: Date.now(),
    publishedAt: new Date().toISOString().slice(0, 10),
  }
  db = [notice, ...db]
  return notice
}

export async function updateNotice(id: number, data: Partial<Notice>): Promise<void> {
  await delay()
  db = db.map((n) => (n.id === id ? { ...n, ...data } : n))
}

export async function deleteNotice(id: number): Promise<void> {
  await delay()
  db = db.filter((n) => n.id !== id)
}
