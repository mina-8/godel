import React, { useState } from 'react'
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Link } from '@inertiajs/react';
function Navbar({userlog}:any) {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Space wrap>
                <Button type="link" size={size}>
                    <Link href='' >
                    My Exam
                    </Link>
                </Button>
            </Space>
          ),
        },
        {
          key: '2',
          label: (
            <Space wrap>
                <Button type="link" size={size}>
                    <Link href='' >
                        Exam Result
                    </Link>
                </Button>
            </Space>
          ),
        },

      ];
    const chekname = ()=>{
        if(userlog == "teacher"){

            return <Space wrap>
                        <Button  size={size}>
                            <Link href="">student</Link>
                        </Button>
                        <Button size={size}>
                            <Link href={route("teacher.video")}>my videos</Link>
                        </Button>
                        <Button size={size}>
                            <Link href={route("index.phase")}>my Corses</Link>
                        </Button>
                        <Button size={size}>
                            <Link href="">my codes</Link>
                        </Button>

                        <Dropdown menu={{ items }} placement="bottom" >
                            <Button size={size}>Exams</Button>
                        </Dropdown>

                        <Button size={size}>
                            <Link href="">Notifcations</Link>
                        </Button>

                    </Space>

        }else{
            return "no"
        }

    }
    return (

    <>
        {chekname()}
    </>

  )
}

export default Navbar