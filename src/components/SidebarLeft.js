import React from 'react';
import logo from '../assets/logo/logo.svg';
import { sidebarMenu } from '../utils/menu';
import { NavLink } from 'react-router-dom';

const notActiveStyle = 'py-2 px-[25px] flex items-center gap-[12px] text-[#323230]';
const activeStyle = "py-2 px-[25px] flex items-center gap-[12px] text-[#0F7070]"

const SidebarLeft = () => {
    return (
        <div className='flex flex-col bg-[#dde4e4]'>
            <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'>
                <img src={logo} alt="logo" className='w-[120px] h-10' />
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