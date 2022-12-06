import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis';
import icons from '../utils/icons';

const { AiFillHeart, AiOutlineHeart, BsThreeDots, TbArrowsShuffle, MdSkipNext, MdSkipPrevious, TbRepeat, BsPauseCircle,
    BsPlayCircle } = icons

const Player = () => {
    const audioEl = new Audio();

    const { curSongId, playing } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState()
    const [source, setSource] = useState()
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const fetchDrtailSong = async () => {
            const res1 = await apis.getDetailSong(curSongId);
            const res2 = await apis.getSong(curSongId);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }

            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
        }

        fetchDrtailSong();

    }, [curSongId])

    const handleTogglePlayMusic = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className='bg-main-400 h-full w-full px-5 flex py-2'>
            <div className='w-[30%] flex-auto flex items-center gap-3'>
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold text-sm text-gray-700'>
                        {songInfo?.title}
                    </span>
                    <span className='text-xs text-gray-500'>
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex flex-col items-center justify-center gap-2'>
                <div className='flex items-center gap-4'>
                    <span className='cursor-pointer'>
                        <TbArrowsShuffle size={24} />
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        className='cursor-pointer hover:text-main-500'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? (
                            <BsPauseCircle size={35} />
                        ) : (
                            <BsPlayCircle size={35} />
                        )}
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipNext size={24} />
                    </span>
                    <span className='cursor-pointer'>
                        <TbRepeat size={24} />
                    </span>
                </div>
                <div className='text-main-500'>

                </div>
            </div>
            <div className='w-[30%] flex-auto'>
                Volumn
            </div>
        </div>
    )
}

export default Player