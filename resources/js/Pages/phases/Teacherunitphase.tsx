import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react'
import Teachergetunits from '../units/Teachergetunits';

function Teacherunitphase({auth , phase , units } : PageProps) {

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
                    <Teachergetunits phases={phase} units={units} />
                </div>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
  )
}

export default Teacherunitphase