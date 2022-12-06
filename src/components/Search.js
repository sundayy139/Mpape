import React from 'react';
import icons from '../utils/icons';

const { AiOutlineSearch } = icons;

const Search = () => {
    return (
        <div className='w-full flex items-center'>
            <span className='bg-[#dde4e4] h-10 pl-4 flex items-center justify-center rounded-l-[20px]'>
                <AiOutlineSearch size={23} />
            </span>
            <input
                type="text"
                className='outline-none bg-[#dde4e4] w-full h-10 rounded-r-[20px] px-4'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
        </div>
    )
}

export default Search