import moment from 'moment';
import React, { memo } from 'react'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { Link } from 'react-router-dom';

const SongCard = ({ thumbnail, title, encodeId, artists, releaseDate, order, percent, style, size, white, isSong }) => {

    const dispatch = useDispatch();

    const handleClickSongCard = (sId) => {
        dispatch(actions.setCurrentSongId(sId))
        dispatch(actions.play(true))
        dispatch(actions.setRecentSong({
            thumbnail,
            title,
            artists,
            encodeId
        }))
    }

    return (
        <div
            className={`w-full p-[10px] flex items-center justify-between gap-[10px] rounded-md  ${style || 'text-black hover:bg-main-100'}`}
            onClick={() => handleClickSongCard(encodeId)}
        >
            <div className='w-full flex items-center justify-evenly gap-5'>
                {
                    order && <span className={`${order === 1 ? 'text-shadow-1' : order === 2 ? 'text-shadow-2' : 'text-shadow-3'} ml-2 text-[hsla(0,0%,100%,.07)] text-[32px] font-[900]`}>{order}</span>
                }
                <div className='w-full flex items-center gap-3 '>
                    <img
                        src={thumbnail}
                        className={`${size || 'w-[40px] h-[40px]'} object-cover rounded-md`} alt='thumbnail'
                    />
                    <div className='flex flex-col h-full justify-between w-[calc(100%-100px)]'>
                        {
                            isSong && (
                                <span className='text-[12px] mb-[6px] opacity-70'>Bài hát</span>
                            )
                        }
                        <div className='text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer'>
                            <span>
                                {
                                    order ? title : title
                                }
                            </span>
                        </div>
                        <div className='text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
                            <span className={`text-xs opacity-70 ${order || white ? 'text-white opacity-70' : 'text-gray-700'}`}>
                                {artists?.map(item => (
                                    <Link
                                        to={item.link}
                                        key={item.id}
                                        className={`hover:text-main-500 hover:underline ${order || white ? 'text-white' : 'text-[#696969]'}`}
                                    >
                                        {item === artists[artists?.length - 1] ? item.name : `${item.name}, `}
                                    </Link>
                                ))}
                            </span>
                        </div>
                        {
                            releaseDate && (
                                <span className={`text-xs opacity-70 ${style || 'text-gray-700'}`}>
                                    {moment(releaseDate * 1000).fromNow()}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                percent && <span className='text-[16px] font-bold'>{percent}%</span>
            }
        </div>
    )
}

export default memo(SongCard)