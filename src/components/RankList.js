import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SongItem } from './index';


const RankList = ({ data, number, orderWith, link, isHideAlbum, hideBtn }) => {
    const [isShowFull, setIsShowFull] = useState(false);
    const [songs, setSongs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isShowFull) {
            setSongs(data?.filter((item, index) => index < number))
        } else {
            setSongs(data)
        }
    }, [isShowFull, data])

    return (
        <div className='w-full'>
            {
                songs?.map((item, index) => (
                    <SongItem
                        songData={item}
                        key={item.encodeId}
                        isHideNote
                        order={index + 1}
                        isHideAlbum={isHideAlbum}
                        orderWith={orderWith}
                    />
                ))
            }
            {
                !hideBtn && (
                    <div className='flex justify-center items-center mt-6'>
                        <button type='button' className=' px-4 py-1 text-sm rounded-r-full rounded-l-full flex items-center justify-center border border-main-500 text-main-500 hover:bg-main-200'>
                            <span
                                onClick={() => {
                                    link ? navigate(link.split('.')[0]) : setIsShowFull(prev => !prev)
                                }}
                            >
                                {
                                    isShowFull ? 'Ẩn bớt' : 'Xem tất cả'
                                }
                            </span>
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default memo(RankList)