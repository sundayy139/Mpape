import React, { useState } from 'react';
import icons from '../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import * as actions from '../store/actions';
import path from '../utils/path'

const { AiOutlineSearch, IoIosClose } = icons;

const Search = () => {
    const { isScroll } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const { singer } = useParams();

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
        <div className={`w-full flex items-center relative  rounded-l-full rounded-r-full ${singer ? 'bg-[hsla(0,0%,100%,.1)]' : 'bg-main-200'} `}>
            {
                keyword && keyword !== '' && (
                    <span className='absolute right-5 cursor-pointer'
                        onClick={() => setKeyword('')}
                    >
                        <IoIosClose
                            size={20}
                            color={`${singer ? 'white' : ''}`}
                        />
                    </span>
                )
            }
            <span className={`h-10 pl-4 flex items-center justify-center rounded-l-[20px] ${!isScroll ? 'bg-transparent' : ''}`}>
                <AiOutlineSearch size={23}
                    color={`${singer ? 'white' : ''}`}
                />
            </span>
            <input
                type="text"
                className={`outline-none w-full h-10 rounded-r-[20px] px-4 ${singer ? 'bg-transparent text-white placeholder:text-white' : 'bg-[#dde4e4]'}`}
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={handleChangeSearchInput}
            />
        </div>
    )
}

export default Search