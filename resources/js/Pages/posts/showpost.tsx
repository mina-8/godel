import React, {
    Fragment,
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import { Image } from "antd";
import { Button, Card, Col, Row } from "antd";
import { router, useForm } from "@inertiajs/react";
import { url } from "inspector";
const Show = ({ posts }: any) => {
    useEffect(() => {
        console.log(posts);
    }, []);
    const { post } = useForm();
    const deletpost = (e: number): any => {
        post(route("delete.post", { id: e }));
    };

    return (
        <>
            <Row gutter={16}>
                {posts.map(
                    (post: {
                        photo: string | undefined;
                        id: number;
                        created_at:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined;
                        content:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined;
                        teacher: {
                            name:
                                | string
                                | number
                                | boolean
                                | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | ReactPortal
                                | null
                                | undefined;
                        };
                    }) => (
                        <Col span={8} key={post.id}>
                            <Card title={post.created_at} bordered={false}>
                                {post.content}
                                <div>name : {post.teacher.name}</div>

                                <Image width={200} src={post.photo} />

                                <br></br>
                                <button onClick={() => deletpost(post.id)}>
                                    delete
                                </button>
                            </Card>
                        </Col>
                    )
                )}
            </Row>
        </>
    );
};

export default Show;
