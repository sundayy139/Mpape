import React, { useState } from 'react';
import icons from '../utils/icons';
import * as apis from '../apis'
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import * as actions from '../store/actions';
import path from '../utils/path'

const { AiOutlineSearch, IoIosClose } = icons;

const Search = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleChangeSearchInput = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams(
                    {
                        q: keyword,
                    }
                ).toString()
            })
        }
    }

    return (
        <div className='w-full flex items-center relative'>
            {
                keyword && keyword !== '' && (
                    <span className='absolute right-5 cursor-pointer'
                        onClick={() => setKeyword('')}
                    >
                        <IoIosClose size={20} />
                    </span>
                )
            }
            <span className='bg-[#dde4e4] h-10 pl-4 flex items-center justify-center rounded-l-[20px]'>
                <AiOutlineSearch size={23} />
            </span>
            <input
                type="text"
                className='outline-none bg-[#dde4e4] w-full h-10 rounded-r-[20px] px-4'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={handleChangeSearchInput}
            />
        </div>
    )
}

export default Search