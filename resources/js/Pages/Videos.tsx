import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import TeacherVideos from './videos/TeacherVideos';
import ShowVideo from './videos/ShowVideo';
function Videos({auth , videos } : PageProps) {
  return (
    <AuthenticatedLayout
            user={auth.user}
            adminuser={auth.adminsession}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard teacher</h2>}
        >
            <Head title="video" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>my video</div>
                            <TeacherVideos />
                            <ShowVideo videos={videos}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}

export default Videos