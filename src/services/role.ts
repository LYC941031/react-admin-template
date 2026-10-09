import { roles } from '../mock/data'
import type { RoleItem } from '../types'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchRoles(): Promise<RoleItem[]> {
  await delay()
  return roles
}
