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
  Table,
  Tag,
} from 'antd'
import type { TableColumnsType } from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAiTool, deleteAiTool, fetchAiTools, updateAiTool } from '../../services/aiTool'
import type { AiTool, AiToolCategory, AiToolStatus } from '../../types'

interface AiToolQuery {
  page: number
  pageSize: number
  keyword?: string
  category?: AiToolCategory
  status?: AiToolStatus
}

interface AiToolForm {
  name: string
  category: AiToolCategory
  description: string
  note: string
  status: AiToolStatus
}

const categoryOptions = [
  { value: 'chat', label: '对话' },
  { value: 'coding', label: '编程' },
  { value: 'image', label: '图像' },
  { value: 'search', label: '搜索' },
]

const statusOptions = [
  { value: 'active', label: '启用' },
  { value: 'disabled', label: '停用' },
]

const categoryText: Record<AiToolCategory, string> = {
  chat: '对话',
  coding: '编程',
  image: '图像',
  search: '搜索',
}

const categoryColor: Record<AiToolCategory, string> = {
  chat: 'blue',
  coding: 'green',
  image: 'purple',
  search: 'orange',
}

export default function AiToolManagementPage() {
  const [query, setQuery] = useState<AiToolQuery>({ page: 1, pageSize: 10 })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AiTool | null>(null)
  const [form] = Form.useForm<AiToolForm>()
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['ai-tools', query],
    queryFn: () => fetchAiTools(query),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['ai-tools'] })

  const createMutation = useMutation({
    mutationFn: createAiTool,
    onSuccess: () => {
      message.success('创建成功')
      invalidate()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (tool: AiTool) => updateAiTool(tool.id, tool),
    onSuccess: () => {
      message.success('更新成功')
      invalidate()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAiTool,
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

  const openEdit = (tool: AiTool) => {
    setEditing(tool)
    form.setFieldsValue({
      name: tool.name,
      category: tool.category,
      description: tool.description,
      note: tool.note,
      status: tool.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (editing) {
      updateMutation.mutate({ ...editing, ...values })
    } else {
      createMutation.mutate({ ...values })
    }
    setModalOpen(false)
  }

  const columns: TableColumnsType<AiTool> = [
    { title: 'ID', dataIndex: 'id', width: 70 },
    {
      title: '名称',
      dataIndex: 'name',
      render: (name: string, record) => (
        <Space direction="vertical" size={0}>
          <strong>{name}</strong>
          <span style={{ color: '#999' }}>{record.description}</span>
        </Space>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      width: 100,
      render: (category: AiToolCategory) => (
        <Tag color={categoryColor[category]}>{categoryText[category]}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: AiToolStatus) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '备注',
      dataIndex: 'note',
      ellipsis: true,
      render: (note: string) => <span>{note}</span>,
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 120 },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space>
          <a onClick={() => openEdit(record)}>编辑</a>
          <Popconfirm title="确认删除？" onConfirm={() => deleteMutation.mutate(record.id)}>
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card
      title="AI 工具管理"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={invalidate}>
            刷新
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            新增工具
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
          <Input placeholder="搜索名称/描述/备注" allowClear />
        </Form.Item>
        <Form.Item name="category">
          <Select placeholder="类别" allowClear style={{ width: 120 }} options={categoryOptions} />
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

      <Table<AiTool>
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
        title={editing ? '编辑 AI 工具' : '新增 AI 工具'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        width={640}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="工具名称" rules={[{ required: true, message: '请输入工具名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="类别"
            rules={[{ required: true, message: '请选择类别' }]}
            initialValue="chat"
          >
            <Select options={categoryOptions} />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述信息' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="note"
            label="备注信息"
            rules={[{ required: true, message: '请输入备注信息' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select options={statusOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
