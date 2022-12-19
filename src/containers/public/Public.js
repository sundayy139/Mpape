import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Player, SidebarLeft, SidebarRight, Header, Loading } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'

const Public = () => {

    const [isShowRightSideBar, setIsShowRightSideBar] = useState(true);
    const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()


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
                        <Scrollbars
                            style={{ width: "100%", height: "100%" }}
                            autoHide
                            onScrollFrame={(values) => {
                                if (values.top !== 0) {
                                    dispatch(actions.isScroll(true))
                                } else {
                                    dispatch(actions.isScroll(false))
                                }
                            }}
                        >
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                <div className={`w-[329px] z-[100] absolute top-0 right-0 bottom-0 shadow-xl bg-main-300 ${isShowRightSideBar ? 'animate-slide-left' : "animate-slide-right2"}`}>
                    <SidebarRight />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px] z-[1000]' >
                <Player setIsShowRightSideBar={setIsShowRightSideBar} isShowRightSideBar={isShowRightSideBar} />
            </div>
        </div>
    )
}

export default Public