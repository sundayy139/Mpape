import React from 'react';
import { useSelector } from 'react-redux'
import { handleNumberFormat } from '../../utils/fn';
import { SongCard, SongItem, SectionCard, Artist } from '../../components/index'
import { Link } from 'react-router-dom';


const SearchAll = () => {
    const { searchData } = useSelector(state => state.music);
    return (
        <div className='w-full flex flex-col gap-8'>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>
                    Nổi Bật
                </h3>
                <div className='flex justify-between items-center gap-8'>
                    {
                        searchData?.top && (
                            <Link
                                to={searchData?.top?.link}
                                className='p-[10px] flex gap-4 items-center flex-1 bg-main-200 rounded-md cursor-pointer'
                            >
                                <img
                                    src={searchData?.top?.thumbnail}
                                    alt='avatar'
                                    className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' && 'rounded-full'}`}
                                />
                                <div className='flex flex-col justify-center'>
                                    <span className='text-[12px] mb-[6px] opacity-70'>
                                        {searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {searchData.top.title || searchData.top.name}
                                    </span>
                                    {
                                        searchData?.top?.objectType === 'artist' && (
                                            <span className='text-[12px]'>
                                                {handleNumberFormat(searchData?.artists[0]?.totalFollow)} quan tâm
                                            </span>
                                        )
                                    }
                                </div>
                            </Link>
                        )
                    }
                    {
                        searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
                            <div key={item.encodeId} className="flex-1">
                                <SongCard
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    encodeId={item.encodeId}
                                    artistsNames={item.artistsNames}
                                    style='bg-main-200'
                                    size='w-[84px] h-[84px]'
                                    isSong
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>
                    Bài hát
                </h3>
                <div className='flex justify-between flex-wrap w-full'>
                    {
                        searchData?.songs?.map((item) => (
                            <div className='w-[48%]' key={item.encodeId}>
                                <SongItem songData={item} isHideAlbum isHideNote />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>
                    Playlist/Album
                </h3>
                <div className='flex justify-between items-start gap-7'>
                    {
                        searchData?.playlists?.filter((item, index) =>
                            index <= 4
                        )?.map(item => (
                            <SectionCard key={item.encodeId} data={item} />
                        ))}
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>
                    Nghệ Sĩ/OA
                </h3>
                <div className='flex items-start flex-wrap'>
                    {
                        searchData?.artists?.map(item => (
                            <div key={item.id} className='w-[20%]'>
                                <Artist
                                    title={item.name}
                                    image={item.thumbnailM}
                                    follow={item.totalFollow}
                                    link={item.link}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAll