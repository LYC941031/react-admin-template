import { useState } from 'react'
import {
  App,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd'
import type { TableColumnsType } from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNotice, deleteNotice, fetchNotices, updateNotice } from '../../services/notice'
import type { Notice, NoticeStatus } from '../../types'

interface NoticeQuery {
  page: number
  pageSize: number
  keyword?: string
  status?: NoticeStatus
}

interface NoticeForm {
  title: string
  content: string
  isPinned: boolean
}

const statusOptions = [
  { value: 'published', label: '已发布' },
  { value: 'offline', label: '已下架' },
]

export default function NoticeListPage() {
  const [query, setQuery] = useState<NoticeQuery>({ page: 1, pageSize: 10 })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Notice | null>(null)
  const [form] = Form.useForm<NoticeForm>()
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['notices', query],
    queryFn: () => fetchNotices(query),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['notices'] })

  const createMutation = useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      message.success('创建成功')
      invalidate()
    },
  })
  const updateMutation = useMutation({
    mutationFn: (n: Notice) => updateNotice(n.id, n),
    onSuccess: () => {
      message.success('操作成功')
      invalidate()
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      message.success('删除成功')
      invalidate()
    },
  })

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (n: Notice) => {
    setEditing(n)
    form.setFieldsValue({ title: n.title, content: n.content, isPinned: n.isPinned })
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (editing) {
      updateMutation.mutate({ ...editing, ...values })
    } else {
      createMutation.mutate({ ...values, status: 'published' })
    }
    setModalOpen(false)
  }

  const togglePin = (n: Notice) => updateMutation.mutate({ ...n, isPinned: !n.isPinned })

  const toggleStatus = (n: Notice) =>
    updateMutation.mutate({
      ...n,
      status: n.status === 'published' ? 'offline' : 'published',
    })

  const columns: TableColumnsType<Notice> = [
    { title: 'ID', dataIndex: 'id', width: 70 },
    {
      title: '标题',
      dataIndex: 'title',
      render: (title: string, record) => (
        <Space>
          {record.isPinned && <Tag color="gold">置顶</Tag>}
          <span style={{ color: record.status === 'offline' ? '#bfbfbf' : undefined }}>{title}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: NoticeStatus) => (
        <Tag color={status === 'published' ? 'green' : 'default'}>
          {status === 'published' ? '已发布' : '已下架'}
        </Tag>
      ),
    },
    { title: '发布时间', dataIndex: 'publishedAt', width: 130 },
    {
      title: '操作',
      key: 'action',
      width: 230,
      render: (_, record) => (
        <Space>
          <a onClick={() => openEdit(record)}>编辑</a>
          <a onClick={() => togglePin(record)}>{record.isPinned ? '取消置顶' : '置顶'}</a>
          <a onClick={() => toggleStatus(record)}>
            {record.status === 'published' ? '下架' : '上架'}
          </a>
          <Popconfirm title="确认删除？" onConfirm={() => deleteMutation.mutate(record.id)}>
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card
      title="公告管理"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={invalidate}>
            刷新
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            新建公告
          </Button>
        </Space>
      }
    >
      <Form
        layout="inline"
        style={{ marginBottom: 16 }}
        onFinish={(values) => setQuery((q) => ({ ...q, ...values, page: 1 }))}
      >
        <Form.Item name="keyword">
          <Input placeholder="搜索标题" allowClear />
        </Form.Item>
        <Form.Item name="status">
          <Select placeholder="状态" allowClear style={{ width: 120 }} options={statusOptions} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>

      <Table<Notice>
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.list}
        pagination={{
          current: query.page,
          pageSize: query.pageSize,
          total: data?.total,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => setQuery((q) => ({ ...q, page, pageSize })),
        }}
      />

      <Modal
        title={editing ? '编辑公告' : '新建公告'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="isPinned" label="置顶" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
