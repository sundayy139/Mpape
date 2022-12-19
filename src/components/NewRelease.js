import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SongCard } from './index';


const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app);
    const [isActive, setIsActive] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(newRelease?.items?.all)
    }, [newRelease])

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-bold capitalize' >
                    Mới Phát Hành
                </h3>
                <span className='text-xs uppercase'>Tất cả</span>
            </div >
            <div className='flex items-center gap-5 text-xs'>
                <button
                    type='button'
                    className={`uppercase px-4 py-1 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 0 ? 'bg-main-500 text-white border-main-500' : ''}`}
                    onClick={() => {
                        setIsActive(0)
                        setData(newRelease?.items?.all)
                    }}
                >
                    Tất cả
                </button>
                <button
                    type='button'
                    className={`uppercase px-4 py-1 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 1 ? 'bg-main-500 text-white border-main-500' : ''}`}
                    onClick={() => {
                        setIsActive(1)
                        setData(newRelease?.items?.vPop)
                    }}
                >
                    Việt Nam
                </button>
                <button
                    type='button'
                    className={`uppercase px-4 py-1 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 2 ? 'bg-main-500 text-white border-main-500' : ''}`}
                    onClick={() => {
                        setIsActive(2)
                        setData(newRelease?.items?.others)
                    }}
                >
                    Quốc tế
                </button>
            </div>
            <div className='flex flex-wrap w-full'>
                {
                    data && data.length > 0 && data.map(item => (
                        <div key={item.encodeId} className='min-[1024px]:w-[33.3333%] min-[768px]:w-[50%]'>
                            <SongCard
                                thumbnail={item.thumbnail}
                                encodeId={item.encodeId}
                                title={item.title}
                                artists={item.artists}
                                releaseDate={item.releaseDate}
                                size='w-[60px] h-[60px]'
                            />
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default NewRelease