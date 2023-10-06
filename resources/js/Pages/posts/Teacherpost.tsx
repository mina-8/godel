import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Button, Form, Modal, Progress, Upload, UploadProps } from "antd";
import {
    FormEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { UploadOutlined } from "@ant-design/icons";
import { chunkFileUploader } from "@/Helpers/Chunk";
export default function Post() {
    const [form] = Form.useForm();
    const [percent, setPercent] = useState(0);
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        const file: File | undefined =
            values.upload?.fileList[0]?.originFileObj;
        if (file == undefined) return;
        showModal();
        await chunkFileUploader(file, setPercent);
        closeModal();
        setPercent(0);
        form.resetFields();
    };
    const uploadProps: UploadProps = {
        customRequest: ({ file, onSuccess }) => {
            setTimeout(() => {
                if (onSuccess) {
                    onSuccess("ok");
                }
            }, 0);
        },
        listType: "picture",
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <Modal
                title="Uploading..."
                footer={null}
                open={isModalOpen}
            >
                <div className="grid place-items-center">
                    <Progress type="circle" percent={percent} />
                </div>
            </Modal>
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
                <Form.Item
                    name="upload"
                    label="Upload"
                    // valuePropName="fileList"
                >
                    <Upload action="/upload.do" {...uploadProps}>
                        <Button icon={<UploadOutlined />}>
                            Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
