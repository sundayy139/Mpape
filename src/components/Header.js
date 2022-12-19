import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import icons from '../utils/icons';
import Search from './Search';

const { BsArrowRight, BsArrowLeft } = icons;


const Header = () => {

    const navigate = useNavigate();
    const { singer } = useParams();
    const { isScroll } = useSelector(state => state.app);

    return (
        <div className={`h-[70px] fixed top-[0] left-[240px] right-0 z-50 px-[59px] flex items-center justify-between ${isScroll ? 'bg-main-300 shadow-md' : 'bg-transparent'}`}>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-6 text-gray-400'>
                    <span onClick={() => navigate(-1)} className='cursor-pointer'>
                        <BsArrowLeft size={24} />
                    </span>
                    <span onClick={() => navigate(+1)} className='cursor-pointer'>
                        <BsArrowRight size={24} />
                    </span>
                </div>
                <div className='w-[80%]'>
                    <Search />
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header