import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarLeft, SidebarRight } from '../../components/index';

const Public = () => {
    return (
        <div className='w-full flex justify-between bg-[#ced9d9]'>
            <div className='w-[240px] border border-red-500'>
                <SidebarLeft />
            </div>
            <div className='flex-auto'>
                <Outlet />
            </div>
            <div className='w-[330px] border boder-blue-100'>
                <SidebarRight />
            </div>
        </div>
    )
}

export default Public