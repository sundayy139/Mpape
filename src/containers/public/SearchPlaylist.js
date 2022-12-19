import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import * as apis from '../../apis'
import { SectionCard } from '../../components/index';

const SearchPlaylist = () => {

    const { searchData } = useSelector(state => state.music)
    const [playlist, setPlaylist] = useState(null)
    useEffect(() => {
        const fetchDataArtist = async () => {
            const res = await apis.apiGetArtist(searchData?.top?.alias)
            console.log(res);
            if (res.data.err === 0) {
                setPlaylist(res.data.data?.sections[1])
            }
        }

        fetchDataArtist()
    }, [searchData])
    return (
        <div className='flex justify-between items-start w-full flex-wrap'>
            {
                playlist && playlist?.items?.length > 0 && playlist.items?.map(item => (
                    <div className='w-[18%] py-4'>
                        <SectionCard key={item.encodeId} data={item} />
                    </div>
                ))}
        </div>
    )
}

export default SearchPlaylist