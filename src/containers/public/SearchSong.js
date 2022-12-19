import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListSong } from '../../components/index'
import * as actions from '../../store/actions';

const SearchSong = () => {

    const { searchData } = useSelector(state => state.music)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.id))
    }, [searchData])

    return (
        <div>
            <ListSong isHideTime isHideNote />
        </div>
    )
}

export default SearchSong