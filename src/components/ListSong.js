import React, { memo } from 'react'
import { SongItem } from './index';
import icons from '../utils/icons'
import moment from 'moment';
import { useSelector } from 'react-redux';

const { BsDot } = icons

const ListSong = ({ totalDuration, isHideTime, isHideNote }) => {

    const { songs } = useSelector(state => state.music)

    return (
        <div className='w-full flex flex-col text-xs text-gray-600 '>
            <div className={`flex w-full items-center uppercase font-semibold ${isHideTime ? 'py-[10px]' : 'p-[10px]'}`}>
                <span className={`${isHideTime ? 'font-bold text-lg capitalize p-0' : 'w-[50%]'}`}>Bài hát</span>
                {!isHideTime && (
                    <>
                        <span className='w-[40%]'>Album</span>
                        <span className='w-[10%] flex justify-end mr-2'>Thời gian</span>
                    </>
                )}
            </div>
            <div className='flex flex-col'>
                {
                    songs?.map(item => (
                        <SongItem key={item.encodeId} songData={item} isHideNote={isHideNote} />
                    ))
                }
            </div>
            {
                totalDuration && (
                    <span className='flex items-center gap-1 p-[10px] border-t border-[rgba(0,0,0,0.05)]'>
                        <span>
                            {`${songs?.length} bài hát`}
                        </span>
                        <BsDot size={24} />
                        <span>
                            {moment.utc(totalDuration * 1000).format("HH:mm:ss")}
                        </span>
                        <span></span>
                    </span>
                )
            }
        </div>
    )
}

export default memo(ListSong)