import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types';
import Teachergetphases from './phases/Teachergetphases';
import Creatphases from './phases/Creatphases';
function Phases({auth , phases } : PageProps) {
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
                    <Creatphases />
                    <Teachergetphases  phases={phases}/>
                </div>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
  )
}

export default Phases