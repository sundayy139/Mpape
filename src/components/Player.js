import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as apis from '../apis';
import * as actions from '../store/actions';
import icons from '../utils/icons';
import moment from 'moment';
import { toast } from "react-toastify"
import { LoadingSong } from './index';

const {
    AiFillHeart,
    AiOutlineHeart,
    BsThreeDots,
    TbArrowsShuffle,
    MdSkipNext,
    MdSkipPrevious,
    TbRepeat,
    BsPauseFill,
    BsPlayFill,
    TbRepeatOnce,
    BsMusicNoteList,
    SlVolume1,
    SlVolume2,
    SlVolumeOff
} = icons;

var intervalId


const Player = ({ setIsShowRightSideBar, isShowRightSideBar }) => {
    const dispatch = useDispatch();
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null);
    const [currentSecond, setCurrentSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [volume, setVolume] = useState(70);
    const [curVolume, setCurVolume] = useState(70);
    const [audio, setAudio] = useState(new Audio());
    const thumbRef = useRef();
    const trackRef = useRef();


    useEffect(() => {
        const fetchDrtailSong = async () => {
            setIsLoading(false)
            const res1 = await apis.apiGetDetailSong(curSongId);
            const res2 = await apis.apiGetSong(curSongId);

            setIsLoading(true);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
                dispatch(actions.setCurrentSongInfo(res1.data.data))
            }

            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warn(res2.data.msg)
                setCurrentSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        }

        fetchDrtailSong();

    }, [curSongId]);


    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.load();
        if (isPlaying && thumbRef.current) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurrentSecond(Math.round(audio.currentTime));
            }, 200)
        }
    }, [audio]);

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffleSong();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatSong() : handleNextSong();
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        }

        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }

    }, [audio, isShuffle, repeatMode]);

    // console.log(isShuffle);
    // console.log(repeatMode);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);


    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleClickProgress = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = percent * songInfo?.duration / 100
        setCurrentSecond(Math.round(audio.currentTime));
    }

    const handleNextSong = () => {
        if (songs) {
            let curSongIndex
            songs?.forEach((item, i) => {
                if (item.encodeId === curSongId) curSongIndex = i
            })
            if (songs.length - 1 > curSongIndex) {
                dispatch(actions.setCurrentSongId(songs[curSongIndex + 1].encodeId))
                dispatch(actions.play(true))
            }
        }
    }

    const handlePreSong = () => {
        if (songs) {
            let curSongIndex
            songs?.forEach((item, i) => {
                if (item.encodeId === curSongId) curSongIndex = i
            })
            if (curSongIndex > 0) {
                dispatch(actions.setCurrentSongId(songs[curSongIndex - 1].encodeId))
                dispatch(actions.play(true))
            }
        }
    }

    const handleShuffleSong = () => {
        const indexRandom = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurrentSongId(songs[indexRandom].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatSong = () => {
        audio.play();
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
                    <span
                        className={`${isShuffle ? "text-purple-600 cursor-pointer" : 'cursor-pointer'} `}
                        title='Phát ngẫu nhiên'
                        onClick={() => setIsShuffle(!isShuffle)}
                    >
                        <TbArrowsShuffle size={24} />
                    </span>
                    <span
                        className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
                        onClick={handlePreSong}
                    >
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        className='cursor-pointer hover:text-main-500 p-1 border rounded-full border-gray-700 flex items-center justify-center'
                        onClick={handleTogglePlayMusic}
                    >
                        {
                            !isLoading ? (
                                <LoadingSong />
                            )
                                : isPlaying ? (
                                    <BsPauseFill size={30} />
                                ) : (
                                    <BsPlayFill size={30} />
                                )
                        }

                    </span>
                    <span
                        onClick={handleNextSong}
                        className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
                    >
                        <MdSkipNext size={24} />
                    </span>
                    <span
                        className={`${repeatMode ? "text-purple-600 cursor-pointer" : 'cursor-pointer'} `}
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1
                        )}
                    >
                        {
                            repeatMode === 1 ? <TbRepeatOnce size={24} /> : <TbRepeat size={24} />
                        }
                    </span>
                </div>
                <div className='w-full flex items-center justify-center text-xs gap-3'>
                    <span className='text-gray-500'>
                        {moment.utc(currentSecond * 1000).format("mm:ss")}
                    </span>
                    <div
                        ref={trackRef}
                        className='relative w-full h-[3px] rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)]  hover:h-[6px] cursor-pointer'
                        onClick={handleClickProgress}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 bg-main-500 rounded-l-full rounded-r-full'>
                        </div>
                    </div>
                    <span>
                        {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
                    </span>
                </div>
            </div>
            <div className='w-[30%] flex-auto flex items-center justify-end gap-4'>
                <div className='flex items-center gap-2'>
                    <span
                        className='cursor-pointer'
                        onClick={() => setVolume(prev => +prev === 0 ? curVolume : 0)}
                    >
                        {
                            +volume >= 50 ? (<SlVolume2 size={16} />) : +volume === 0 ? (<SlVolumeOff size={16} />) : (<SlVolume1 size={16} />)
                        }
                    </span>
                    <input
                        className='cursor-pointer'
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => {
                            setVolume(e.target.value);
                            setCurVolume(e.target.value);
                        }}
                    />
                </div>
                <span
                    className={`hover:cursor-pointer p-1 rounded-sm opacity-90 hover:opacity-100 ${isShowRightSideBar ? 'bg-main-500' : 'bg-main-200'}`}
                    onClick={() => setIsShowRightSideBar(prev => !prev)}
                >
                    <BsMusicNoteList size={20} />
                </span>
            </div>
        </div>
    )
}

export default Player