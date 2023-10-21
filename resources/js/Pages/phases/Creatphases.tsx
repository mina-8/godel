import { router } from '@inertiajs/react';
import { Button, Form, Input, Modal, Select, Space, notification } from 'antd';
import React, { useState } from 'react'
const key = 'updatable';
const { Option } = Select;
function Creatphases() {
    const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    setTimeout(() => {
      api.open({
        key,
        message: 'New course',
        description: 'Creat Success ',
      });
    }, 1000);
  };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };

      const handleOk = () => {

        setIsModalOpen(false);

      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        router.post(route("store.phase") , values)
        setIsModalOpen(false);
        openNotification()
      };
  return (
    <>
        {contextHolder}
      <Button type="primary" onClick={showModal}>
        Creat Corses
      </Button>
      <Modal title="Creat Corse" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Corse title">
                <Space>
                    <Form.Item
                    name="unit_title"
                    noStyle
                    rules={[{ required: true, message: 'Title is required' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="Please input title" />
                    </Form.Item>
                </Space>
            </Form.Item>
            <Form.Item label="Phase">
                <Space.Compact>
                    <Form.Item
                    name={'phase'}
                    style={{ width: 160 }}
                    rules={[{ required: true, message: 'Phase is required' }]}
                    >
                    <Select placeholder="Select phases">
                        <Option value="T_1">thanwy one</Option>
                        <Option value="T_2">thanwy tow</Option>
                        <Option value="T_3">thanwy three</Option>
                        <Option value="C_1">coleg one</Option>
                        <Option value="C_2">coleg tow</Option>
                        <Option value="C_3">coleg three</Option>
                        <Option value="C_4">coleg four</Option>
                        <Option value="any">any</Option>
                    </Select>
                    </Form.Item>
                </Space.Compact>
            </Form.Item>

            <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Creatphases