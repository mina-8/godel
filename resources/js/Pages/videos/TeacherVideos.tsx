import { Col, Row } from "antd";
import { ReactNode , useEffect } from "react";
import  "../../../css/teachervideo.css"

function TeacherVideos({video}:any) {
    useEffect(()=>{
        console.log
        (video)
    })

    return (
        <>
        <Row >
            {video.map((showvideo: {
                exam_video: ReactNode;
                privacy_video: ReactNode;
                description_video: ReactNode;
                title_video: ReactNode;
                path_video: string | undefined; id: any | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; video: string | undefined;
                cover_video : string;
                price_video : number
})=>

            <Col span={24} key={showvideo.id}>
                <video className="teacher_video" src={showvideo.path_video} controls />
                <div className="container">
                    <div dir="auto"><span dir="auto">title </span>: {showvideo.title_video}</div>
                    <div dir="auto"><span dir="auto">description </span>: {showvideo.description_video}</div>
                    <div dir="auto"><span dir="auto">price </span>: {showvideo.price_video}</div>
                    <div dir="auto"><span dir="auto">privacy </span>: {showvideo.privacy_video}</div>
                    <div dir="auto"><span dir="auto">exam</span> : {showvideo.exam_video}</div>
                </div>
            </Col>

            )}

        </Row>
        </>
    );
}

export default TeacherVideos;
