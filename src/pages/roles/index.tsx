import { Card, Table, Tag } from 'antd'
import type { TableColumnsType } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { fetchRoles } from '../../services/role'
import type { RoleItem } from '../../types'

export default function RoleListPage() {
  const { data, isLoading } = useQuery({ queryKey: ['roles'], queryFn: fetchRoles })

  const columns: TableColumnsType<RoleItem> = [
    { title: 'ID', dataIndex: 'id', width: 70 },
    { title: '角色名', dataIndex: 'name' },
    { title: '编码', dataIndex: 'code', render: (code: string) => <Tag>{code}</Tag> },
    { title: '描述', dataIndex: 'description' },
    {
      title: '权限',
      dataIndex: 'permissions',
      render: (perms: string[]) => perms.map((p) => <Tag key={p} color="blue">{p}</Tag>),
    },
  ]

  return (
    <Card title="角色管理">
      <Table<RoleItem>
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Card>
  )
}
