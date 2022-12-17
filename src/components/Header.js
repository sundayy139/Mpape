import React from 'react';
import icons from '../utils/icons';
import Search from './Search';

const { BsArrowRight, BsArrowLeft } = icons;


const Header = () => {

    return (
        <div className='h-[70px] px-[59px] flex items-center justify-between'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-6 text-gray-400'>
                    <span>
                        <BsArrowLeft size={24} />
                    </span>
                    <span>
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