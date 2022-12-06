import React from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../components/index';

const Public = () => {
    return (
        <div className='w-full min-h-screen flex flex-col bg-main-300'>
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] flex-none border border-red-500'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto'>
                    <Outlet />
                </div>
                <div className='w-[330px] flex-none border boder-blue-100  hidden animate-slide-left 1600:flex'>
                    <SidebarRight />
                </div>
            </div>
            <div className='flex-none h-[90px]' >
                <Player />
            </div>
        </div>
    )
}

export default Public