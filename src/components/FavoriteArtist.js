import React, { memo } from 'react'

const FavoriteArtist = ({ favoriteArtist }) => {
    return (
        <div className='px-[59px] flex gap-5 mt-12 flex-col'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-bold capitalize'>
                    Nghệ sĩ yêu thích
                </h3>
                <span className='text-xs uppercase'>Tất cả</span>
            </div>
            <div className='flex mx-[-16px]'>
                {
                    favoriteArtist?.items?.filter((artirst, index) => index <= 4).map(artirst => (
                        <div key={artirst.encodeId} className='flex-1 px-4 relative'>
                            <img src={artirst.thumbnailM} className='w-ful object-contain rounded-md' />
                            <div className='flex absolute bottom-[5%] rounded-md right-6 left-6 top-[70%] justify-between'>
                                <img src={artirst?.song?.items[0].thumbnail} className='w-[30%] rounded-md object-cover' />
                                <img src={artirst?.song?.items[1].thumbnail} className='w-[30%] rounded-md object-cover' />
                                <img src={artirst?.song?.items[2].thumbnail} className='w-[30%] rounded-md object-cover' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(FavoriteArtist)