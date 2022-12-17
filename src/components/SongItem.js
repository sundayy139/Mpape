import moment from 'moment';
import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import icons from '../utils/icons';
import * as actions from '../store/actions';

const { BsMusicNoteBeamed } = icons

const SongItem = ({ songData, isHideAlbum, isHideNote }) => {

    const dispatch = useDispatch()
    return (
        <div className='flex justify-between items-center p-[10px] border-b border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
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
            <div className='flex items-center gap-3 flex-1'>
                {
                    !isHideNote ? (
                        <span>
                            <BsMusicNoteBeamed />
                        </span>
                    ) : ''
                }

                <img className='h-10 w-10 rounded-md object-cover' src={songData?.thumbnail} alt="thumbnail" />
                <span className='flex flex-col'>
                    <span className='text-sm font-semibold'>
                        {songData?.title.length > 25 ? `${songData?.title.slice(0, 25)}...` : songData?.title}
                    </span>
                    <span className='text-[12px] opacity-70'>
                        {songData?.artistsNames}
                    </span>
                </span>
            </div>
            {
                !isHideAlbum ? (
                    <div className='flex-1 flex justify-center items-center text-[12px] opacity-70'>
                        {songData?.album?.title.length > 25 ? `${songData?.album?.title.slice(0, 25)}...` : songData?.album?.title}
                    </div>
                ) : (
                    ''
                )
            }

            <div className='flex-1  flex justify-end text-[12px] opacity-70'>
                {moment.utc(songData?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    )
}

export default memo(SongItem)