import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { Card, Col, Row } from 'antd';
import React, { ReactNode, useEffect } from 'react'
const { Meta } = Card;
function ShowVideo({videos}:any) {
    useEffect(()=>{
        console.log(videos)
    } , []);
    const Deletvideo = (e:number)=>{
        router.post(route("delete.video" , {id:e}))
    }
    const Editvideo = (e:number)=>{
        router.get(route("edit.video" , {id:e}))
    }
    const Videoget = (e:number)=>{
        router.get(route("show.video" , {id:e}))
    }
    return (
    <>
         <Row gutter={16}>
            {videos.map((video: {
                description_video: ReactNode;
                title_video: ReactNode;
                path_video: string | undefined; id: any | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; video: string | undefined;
                cover_video : string;
                price_video : number
})=>

            <Col span={6} key={video.id}>
                <Card

                bordered={false}
                hoverable
                style={{ width: 240 , margin: 10 }}
                cover={<img alt="example" src={video.cover_video} onClick={()=>Videoget(video.id)}/>}
                actions={[
                    <EditOutlined key="edit" onClick={()=>Editvideo(video.id)}/>,
                    <DeleteOutlined key="delete" onClick={()=>Deletvideo(video.id)}/>
                  ]}
                >

                <Meta title={video.title_video} description={video.description_video }  />



                </Card>
            </Col>
            )}



        </Row>




    </>
  )
}

export default ShowVideo