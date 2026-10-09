import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthRole = 'admin' | 'editor'

export interface AuthUser {
  name: string
  username: string
  role: AuthRole
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

// mock 登录：任意非空账号密码即可通过，token 为本地生成（真实项目替换为 API）
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (username) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        set({
          token: `mock-token-${Date.now()}`,
          user: {
            name: username === 'admin' ? '管理员' : username,
            username,
            role: username === 'admin' ? 'admin' : 'editor',
          },
        })
      },
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' },
  ),
)
