import { Card, Col, Row, Statistic, Typography } from 'antd'
import { FileTextOutlined, RiseOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../services/user'

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ['users', { page: 1, pageSize: 5 }],
    queryFn: () => fetchUsers({ page: 1, pageSize: 5 }),
  })

  const stats = [
    { title: '用户总数', value: data?.total ?? 0, icon: <UserOutlined /> },
    { title: '角色数', value: 3, icon: <TeamOutlined /> },
    { title: '本月新增', value: 12, icon: <RiseOutlined /> },
    { title: '待办事项', value: 5, icon: <FileTextOutlined /> },
  ]

  return (
    <div>
      <Row gutter={16}>
        {stats.map((s, i) => (
          <Col span={6} key={i}>
            <Card>
              <Statistic title={s.title} value={s.value} prefix={s.icon} />
            </Card>
          </Col>
        ))}
      </Row>
      <Card title="关于本模板" style={{ marginTop: 16 }}>
        <Typography.Paragraph>
          欢迎使用本模板。这是一个基于 SDD（Spec-Driven Development，规格驱动开发）流程生成的后台管理系统示例。
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          完整的需求规格、技术方案与任务清单见 <code>docs/specs/</code> 目录，Claude Code 工作流配置见 <code>.claude/</code>。
        </Typography.Paragraph>
      </Card>
    </div>
  )
}
