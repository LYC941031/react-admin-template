import { App, Button, Card, Form, Input, Switch } from 'antd'

interface SettingsForm {
  siteName: string
  enableRegister: boolean
}

export default function SettingsPage() {
  const { message } = App.useApp()

  const onFinish = () => {
    message.success('保存成功（示例，未持久化）')
  }

  return (
    <Card title="系统设置" style={{ maxWidth: 640 }}>
      <Form<SettingsForm>
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ siteName: 'React Admin', enableRegister: false }}
      >
        <Form.Item
          name="siteName"
          label="站点名称"
          rules={[{ required: true, message: '请输入站点名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="enableRegister" label="开放注册" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
