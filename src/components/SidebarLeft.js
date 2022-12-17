import React from 'react';
import logo from '../assets/logo/logo.svg';
import { sidebarMenu } from '../utils/menu';
import { NavLink, useNavigate } from 'react-router-dom';
import path from "../utils/path";

const notActiveStyle = 'py-2 px-[25px] flex items-center gap-[12px] text-[#323230]';
const activeStyle = "py-2 px-[25px] flex items-center gap-[12px] text-[#0F7070]"

const SidebarLeft = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col bg-main-200 h-full'>
            <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'
                onClick={() => navigate(path.HOME)}
            >
                <img src={logo} alt="logo" className='w-[120px] h-10 cursor-pointer' />
            </div>
            <div className='flex flex-col'>
                {
                    sidebarMenu && sidebarMenu.map((item) => (
                        <NavLink
                            className={
                                ({ isActive }) => isActive ? activeStyle : notActiveStyle
                            }
                            to={item.path}
                            key={item.path}>
                            {item.icon}
                            <span className='font-bold text-[13px]'>
                                {item.title}
                            </span>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarLeft