import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
<<<<<<< HEAD
import { Button, Form, Input, Modal, Progress, Upload, UploadProps } from "antd";
=======
import { Button, Form, Modal, Progress, Upload, UploadProps } from "antd";
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
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
<<<<<<< HEAD
import axios from "axios";
export default function Post() {

    const [form] = Form.useForm();
    const [percent, setPercent] = useState(0);
    const [post , setpost] = useState({
        title : ""
    });
    function handelchange(e:any){
        const key = e.target.id;
        const value = e.target.value;
        setpost(values=>({
            ...values,
            [key]:value
        })
        );

    }
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        const file: File | undefined =
            values.upload?.fileList[0]?.originFileObj;
        if (file == undefined) return;
        showModal();
        await chunkFileUploader(file, setPercent , post.title);

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

=======
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

>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
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
<<<<<<< HEAD
                <Form.Item>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    className="mt-1"
                    isFocused={true}
                    value={post.title}
                    onChange={handelchange}
                    />
                </Form.Item>
=======
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
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
