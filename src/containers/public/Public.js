import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Player, SidebarLeft, SidebarRight, Header, Loading } from '../../components/index';
import { useSelector } from 'react-redux';

const Public = () => {

    const [isShowRightSideBar, setIsShowRightSideBar] = useState(false);
    const { isLoading } = useSelector(state => state.app)


    return (
        <div className='w-full relative h-screen flex flex-col bg-main-300 pb-[90px]'>
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] flex-none '>
                    <SidebarLeft />
                </div>
                <div className='flex-auto flex flex-col relative'>
                    {isLoading && (
                        <div className='absolute top-0 right-0 left-0 bottom-0 bg-main-300 flex items-center justify-center z-30'>
                            <Loading />
                        </div>
                    )}
                    <div className='flex-none' >
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars style={{ width: "100%", height: "100%" }} autoHide >
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                <div className={`w-[329px] absolute top-0 right-0 bottom-0 shadow-xl bg-main-300 z-30 ${isShowRightSideBar ? 'animate-slide-left' : "animate-slide-right2"}`}>
                    <SidebarRight />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px] z-50' >
                <Player setIsShowRightSideBar={setIsShowRightSideBar} isShowRightSideBar={isShowRightSideBar} />
            </div>
        </div>
    )
}

export default Public