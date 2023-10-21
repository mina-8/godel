import React from 'react'
import Creatvideos from '../videos/Creatvideos'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head, Link , router } from '@inertiajs/react'
import { Button } from 'antd';
import ShowVideo from '../videos/ShowVideo'

function Teacherunitvideos({auth , unitid , videos } : PageProps) {
  return (
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
                    <Button type="primary">
                        <Link href={route("create.video" , unitid)}>
                            Create video
                        </Link>
                    </Button>
                    <ShowVideo videos={videos} />
                </div>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
  )
}

export default Teacherunitvideos