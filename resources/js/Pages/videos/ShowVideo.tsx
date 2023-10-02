import { router } from '@inertiajs/react';
import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react'

function ShowVideo({videos}:any) {
    useEffect(()=>{
        console.log(videos)
    } , []);
    const deletvideo = (e:number)=>{
        router.post(route("delete.video" , {id:e}))
    }
    return (
    <>
         <Row gutter={16}>
            {videos.map((video)=>

            <Col span={8} key={video.id}>
                <Card title={video.id} bordered={false}>
                    {/* <div>name : {video.video}</div> */}
                    <video src={video.video}></video>
                    <br></br>
                    <button onClick={()=>deletvideo(video.id)} >delete</button>

                </Card>
            </Col>
            )}



        </Row>


    </>
  )
}

export default ShowVideo