import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Button, Form, Input, Modal, Progress, Select, Space, Steps, Upload, UploadProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { PageProps } from '@/types'
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { chunkFileUploader } from '@/Helpers/Chunkvideos';
interface PriceValue {
    number?: number;
}

interface PriceInputProps {
    value?: PriceValue;
    onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value ={}, onChange }) => {
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
          value={value.number || number}
          onChange={onNumberChange}
          style={{ width: 100 }}
        />
      </span>
    );
  };
const { Option } = Select;
function Creatvideos({auth , unitid } : PageProps) {
    useEffect(()=>{
        console.log(unitid)
    } , []);


    const  [idunit , setidunit] = useState(unitid);
    const [percent, setPercent] = useState(0);

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
    const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
    };


    // start step
    const [current , setCurrent] = useState(0);
    const [videodetail, setVideodetail] = useState(null);
    const [uploadvide , setUploadvideo] = useState(null);
    const [post , setPost] = useState({
        unitid : "" ,
        title : "" ,
        desc : "" ,
        privacy : "" ,
        exam : "" ,
        price : ""
    });
    const onFinishcreatvideo =(values: any)=>{
        setVideodetail(values)

        setPost({
            unitid : values.unit_id ,
            title : values.title_video ,
            desc : values.Description_video ,
            privacy : values.privacy_video ,
            exam : values.exam_video ,
            price : values.price_video.number
        })

        setCurrent(1)

      }
      const onFinishuploadvideo = async(values: any)=>{
        setUploadvideo(values)
        const file: File | undefined =
            values.upload?.fileList[0]?.originFileObj;
        if (file == undefined) return;
        showModal();
        await chunkFileUploader(file, setPercent , post.unitid , post.title , post.desc , post.privacy , post.exam , post.price);

        closeModal();
        setPercent(0);

        setCurrent(2)
      }

      const onFinishform = (values:any)=>{

        router.get(route("show.unit" , idunit))

      }
    const forms = [
        <Createvideo onFinish={onFinishcreatvideo} initialValues={videodetail} idunit={idunit} />,
        <Uploadvideo onFinish={onFinishuploadvideo} initialValues={uploadvide} percent={percent} isModalOpen={isModalOpen} uploadProps={uploadProps}/>,
        <Finishform onFinish={onFinishform}/>
    ];
    //disable step
    const isStepDisabled = (stepnumber : number)=>{
        if(stepnumber === 0){
            return false;
        }
        if(stepnumber === 1){
            return videodetail === null;
        }
        if(stepnumber === 2){
            return videodetail === null || uploadvide === null;
        }
      }
  return (
    <>
<AuthenticatedLayout
    user={auth.user}
    adminuser={auth.adminsession}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard teacher</h2>}
>
    <Head title="corses" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">

               <Steps
               style={{padding: "32px 16px"}}
               onChange={setCurrent}
               current={current}
               >
                    <Steps.Step disabled={current==2 ? true : isStepDisabled(0)} title={"create video"}/>
                    <Steps.Step disabled={current==2 ? true : isStepDisabled(1)} title={"upload video"}/>
                    <Steps.Step disabled={isStepDisabled(2)} title={"Done"}/>
               </Steps>
               {forms[current]}
                </div>
            </div>
        </div>
    </div>
</AuthenticatedLayout>

    </>
  )
}

function Createvideo({onFinish , initialValues , idunit }:React.SetStateAction<any>){
    const checkPrice = (_: any, value: { number: number }) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
        };
    return(
        <>
            <Form
            onFinish={onFinish}
            initialValues={initialValues}
            >
                        <Form.Item
                        hidden={true}
                        name="unit_id"
                        initialValue={idunit}>
                            <Input />
                        </Form.Item>
                <Form.Item label="video title">
                    <Space>
                        <Form.Item
                        name="title_video"
                        noStyle
                        rules={[{ required: true, message: 'Title is required' }]}
                        >
                            <Input dir='auto' style={{ width: 260 }} placeholder="Please input title" />
                        </Form.Item>
                    </Space>
                </Form.Item>

                <Form.Item label="Description">
                    <Space.Compact>
                        <Form.Item
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
                        initialValue={"public"}
                        name={'privacy_video'}
                        style={{ width: 160 }}

                        >
                        <Select
                        defaultValue="public"
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
                        initialValue={"null"}
                        name={'exam_video'}
                        style={{ width: 160 }}
                        >
                        <Select
                        defaultValue="null"
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
                            <PriceInput />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>

                <Button
                type='primary'
                htmlType='submit'
                >Next</Button>
            </Form>
        </>
    )
}

function Uploadvideo({onFinish , initialValues , percent , isModalOpen , uploadProps}:React.SetStateAction<any>){


    return(
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
            onFinish={onFinish}
            initialValues={initialValues}
            >
                <Form.Item
                        name="upload"
                        label="Upload"
                        // valuePropName="fileList"
                        rules={[{ required: true,  message: 'video is required' }]}
                    >
                        <Upload action="/upload.do" {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Click to upload
                            </Button>
                        </Upload>
                </Form.Item>
                <Button
                type='primary'
                htmlType='submit'
                >Next</Button>
            </Form>
        </>
    )
}

function Finishform({onFinish , initialValues}:React.SetStateAction<any>){
    return(
        <>
            <h1>you update success</h1>
            <Form
            onFinish={onFinish}
            initialValues={initialValues}>
                <Button
                type='primary'
                htmlType='submit'
                >finish</Button>
            </Form>
        </>
    )
}

export default Creatvideos