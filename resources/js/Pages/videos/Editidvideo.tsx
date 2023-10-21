import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Meta from 'antd/es/card/Meta';
import { router } from '@inertiajs/react';
interface PriceValue {
    number?: number;
}

interface PriceInputProps {
    value?: PriceValue;
    onChange?: (value: PriceValue) => void;
    val : number
}

const PriceInput: React.FC<PriceInputProps> = ({ value ={}, onChange  , val}) => {
    const [number, setNumber] = useState(0);


    const triggerChange = (changedValue: { number?: number; }) => {
      onChange?.({ number,  ...value, ...changedValue });
    };

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = parseInt(e.target.value || '0', 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!('number' in value)) {
        setNumber(newNumber);
      }
      triggerChange({ number: newNumber });
    };


    return (
      <span>
        <Input
          type="text"
          value={value.number || number || val}
          onChange={onNumberChange}
          style={{ width: 100 }}
        />
      </span>
    );
  };
const { Option } = Select;
function Editidvideo({editvideos}:any) {
    useState(()=>{
        console.log(editvideos)
    } );
    const [form] = Form.useForm();
    const checkPrice = (_: any, value: { number: number }) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
        };
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        router.post(route("update.video") , values);







        form.resetFields();
    };
  return (
    <div>
        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            form={form}
                            autoComplete="off"

                            >
<Row gutter={16}>
            {editvideos.map((video: {
                exam_video: any;
                privacy_video: any;
                description_video: string;
                title_video: string;
                path_video: string | undefined;
                id: any | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined;
                cover_video : string;
                price_video : number
})=>

            <Col span={24} key={video.id}>
                                <Form.Item
                                hidden={true}
                                name="id"
                                initialValue={video.id}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="video title">
                                    <Space>
                                        <Form.Item
                                        name="title_video"
                                        noStyle
                                        initialValue={video.title_video}
                                        rules={[{ required: true, message: 'Title is required' }]}
                                        >
                                            <Input dir='auto'  style={{ width: 260 }} placeholder="Please input title" />
                                        </Form.Item>
                                    </Space>
                                </Form.Item>

                                <Form.Item label="Description">
                                    <Space.Compact>
                                        <Form.Item
                                        initialValue={video.description_video}
                                        name={'Description_video'}
                                        style={{ width: 260 }}
                                        rules={[{ required: true, message: 'Phase is required' }]}
                                        >
                                        <TextArea dir='auto' rows={4} style={{ width: 260 }} placeholder="Please input title" />
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>

                                <Form.Item label="Privacy video show">
                                    <Space.Compact>
                                        <Form.Item
                                        initialValue={video.privacy_video}
                                        name={'privacy_video'}
                                        style={{ width: 160 }}

                                        >
                                        <Select
                                        // defaultValue="public"
                                        placeholder="Select show video">
                                            <Option value="public">public show</Option>
                                            <Option value="one">one show</Option>
                                            <Option value="tow">twice show</Option>
                                        </Select>
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>

                                <Form.Item label="Exam video">
                                    <Space.Compact>
                                        <Form.Item
                                        initialValue={video.exam_video}
                                        name={'exam_video'}
                                        style={{ width: 160 }}
                                        >
                                        <Select
                                        // defaultValue="null"
                                        placeholder="Select show video">
                                            <Option value="null">no exam</Option>
                                        </Select>
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>

                                <Form.Item label="price">
                                    <Space.Compact>
                                        <Form.Item

                                        name={'price_video'}
                                        style={{ width: 260 }}
                                        rules={[{ required: true, validator: checkPrice ,  message: 'price is required' }]}
                                        >
                                            <PriceInput val={video.price_video}/>
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
            </Col>

            )}



        </Row>


                            </Form>
    </div>
  )
}

export default Editidvideo