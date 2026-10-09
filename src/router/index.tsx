import type { ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import { useAuthStore } from '../store/auth'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import UserListPage from '../pages/users'
import RoleListPage from '../pages/roles'
import SettingsPage from '../pages/settings'
import NoticeListPage from '../pages/notices'
import AiToolManagementPage from '../pages/ai-tools'
import NotFoundPage from '../pages/error/NotFound'

function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <BasicLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'notices', element: <NoticeListPage /> },
      { path: 'users', element: <UserListPage /> },
      { path: 'ai-tools', element: <AiToolManagementPage /> },
      { path: 'roles', element: <RoleListPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
