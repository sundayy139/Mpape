import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SongItem, ListSong } from '../../components/index'
import * as actions from '../../store/actions';

const SearchSong = () => {

    const { searchData, songs } = useSelector(state => state.music)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.playlistId))
    }, [searchData])

    return (
        <div>
            <ListSong isHideTime isHideNote />
        </div>
    )
}

export default SearchSong