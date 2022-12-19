import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import icons from '../utils/icons';
import { SongCard } from './index';
import * as apis from '../apis';
import Scrollbars from 'react-custom-scrollbars';

const { BsTrash } = icons

const SidebarRight = () => {

    const [isRencent, setIsRencent] = useState(false);
    const [playlist, setPlaylist] = useState(null);

    const { curSongInfo, curPlaylistId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)

    const fetchDetailPlaylist = async () => {
        const res = await apis.apiGetDetailPlaylist(curPlaylistId)
        if (res?.data?.err === 0) {
            setPlaylist(res?.data?.data?.song?.items)
        }
    }

    useEffect(() => {
        if (curPlaylistId) fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (curPlaylistId && isPlaying) fetchDetailPlaylist()
    }, [curPlaylistId, isPlaying])

    useEffect(() => {
        isPlaying && setIsRencent(false)
    }, [isPlaying, curSongId])

    return (
        <div className='flex flex-col w-full h-full text-xs'>
            <div className='h-[70px] flex-none py-[14px] px-2 flex items-center justify-between'>
                <div className='flex items-center py-1 px-1 rounded-l-full rounded-r-full bg-main-200'>
                    <span
                        className={`py-1 px-4 rounded-l-full rounded-r-full cursor-pointer font-[600] text-gray-700  ${!isRencent && 'bg-main-100 text-[#0f7070]'}`}
                        onClick={() => setIsRencent(false)}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-1 px-4 rounded-l-full rounded-r-full cursor-pointer font-[600] text-gray-700 ${isRencent && 'bg-main-100 text-[#0f7070]'}`}
                        onClick={() => setIsRencent(true)}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className='p-2 rounded-full bg-main-200 cursor-pointer hover:bg-main-100'>
                    <BsTrash size={15} />
                </span>
            </div>

            {
                isRencent ? (
                    <div className='w-full h-full pb-[90px] px-2 '>

                        <Scrollbars style={{ width: "100%", height: "100%" }} autoHide >
                            <div className='w-full'>
                                {
                                    recentSongs && recentSongs?.map(item => (
                                        <div key={item.encodeId}>
                                            <SongCard
                                                thumbnail={item?.thumbnail}
                                                title={item?.title}
                                                artists={item?.artists}
                                                encodeId={item?.encodeId}
                                                style='bg-main-300 hover:bg-main-100 text-xs text-gray-600'
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </Scrollbars>
                    </div>
                ) : (
                    <div className='w-full h-full pb-[90px] px-2 '>
                        <Scrollbars style={{ width: "100%", height: "100%" }} autoHide >
                            <div className='w-full'>
                                <SongCard
                                    thumbnail={curSongInfo?.thumbnail}
                                    title={curSongInfo?.title}
                                    artists={curSongInfo?.artists}
                                    encodeId={curSongInfo?.encodeId}
                                    style='bg-main-500 text-white'
                                    white={true}
                                />
                                <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px] gap-1'>
                                    <span className='text-sm font-bold'>
                                        Tiếp theo
                                    </span>
                                    <span className='opacity-70 text-xs'>
                                        <span className='mr-1'>
                                            Từ playlist
                                        </span>
                                        <span className='font-[600] text-main-500'>
                                            {curSongInfo?.album?.title}
                                        </span>
                                    </span>
                                </div>
                                {
                                    playlist && playlist?.map(item => (
                                        <div key={item.encodeId}>
                                            <SongCard
                                                thumbnail={item?.thumbnail}
                                                title={item?.title}
                                                artists={item?.artists}
                                                encodeId={item?.encodeId}
                                                sm={true}
                                                style='bg-main-300 hover:bg-main-100 text-xs text-gray-600'
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </Scrollbars>
                    </div>
                )
            }

        </div>
    )
}

export default SidebarRight