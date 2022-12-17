import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { searchMenu } from '../../utils/menu';

const Search = () => {
    const { keyword } = useSelector(state => state.music)

    return (
        <div className='px-[59px] w-full pb-[90px]'>
            <div className='flex h-[50px] mb-7 items-center text-sm py-1 border-b border-b-[rgba(0,0,0,0.1)]'>
                <span className='text-[24px] font-bold pr-6 border-r border-r-gray-400 font-[500]-gray-400 '>Kết Quả Tìm Kiếm</span>
                <div className='flex items-center gap-2'>
                    {
                        searchMenu.map(item => (
                            <NavLink
                                key={item.path}
                                to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                                className={({ isActive }) =>
                                    `py-[15px] mx-4 uppercase text-black font-[600] cursor-pointer hover:text-main-500 ${isActive ? 'border-b-[2px] border-b-main-500 text-main-500' : ''}`
                                }
                            >
                                {item.title}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Search