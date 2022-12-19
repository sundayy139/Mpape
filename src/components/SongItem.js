import moment from 'moment';
import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import icons from '../utils/icons';
import * as actions from '../store/actions';
import { Link } from 'react-router-dom';

const { BsMusicNoteBeamed } = icons

const SongItem = ({ songData, isHideAlbum, isHideNote, order, orderWith }) => {

    const dispatch = useDispatch();
    return (
        <div className='flex w-full justify-between items-center p-[10px] border-b border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurrentSongId(songData?.encodeId));
                dispatch(actions.play(true));
                dispatch(actions.playAlbum(true))
                dispatch(actions.setRecentSong({
                    thumbnail: songData?.thumbnail,
                    title: songData?.title,
                    artistsNames: songData?.artistsNames,
                    encodeId: songData?.encodeId
                }))
            }}
        >
            <div className='flex items-center gap-3 w-[50%]'>
                {
                    !isHideNote ? (
                        <span>
                            <BsMusicNoteBeamed />
                        </span>
                    ) : ''
                }
                {
                    order && <span
                        className={`${order === 1
                            ? 'text-shadow-1' : order === 2
                                ? 'text-shadow-2' : order === 3
                                    ? 'text-shadow-3' : 'text-shadow-4'} ml-2 text-[hsla(0,0%,100%,.07)] text-[32px] font-[900] ${orderWith} text-center`}
                    >
                        {order}
                    </span>
                }
                <img className='h-10 w-10 rounded-md object-cover' src={songData?.thumbnail} alt="thumbnail" />
                <div className='flex flex-col w-[70%]'>
                    <div className='w-full text-ellipsis whitespace-nowrap overflow-hidden'>
                        <span className='text-sm font-semibold'>
                            {songData?.title}
                        </span>
                    </div>
                    <div className='text-ellipsis whitespace-nowrap overflow-hidden'>
                        <span className='text-[12px] opacity-70'>
                            {songData?.artists?.map(item => (
                                <Link
                                    to={item.link}
                                    key={item.id}
                                    className='text-[#696969] hover:text-main-500 hover:underline'
                                >
                                    {item === songData.artists[songData.artists.length - 1] ? item.name : `${item.name}, `}
                                </Link>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
            {
                !isHideAlbum ? (
                    <div className='w-[40%] text-[12px] opacity-70 text-ellipsis whitespace-nowrap overflow-hidden'>
                        {songData?.album?.title}
                    </div>
                ) : (
                    ''
                )
            }

            <div className='w-[10%] flex justify-end text-[12px] opacity-70 mr-2'>
                {moment.utc(songData?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    )
}

export default memo(SongItem)