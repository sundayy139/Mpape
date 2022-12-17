import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurrentSongId = (sId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sId
})

export const setCurrentSongInfo = (data) => ({
    type: actionTypes.SET_CUR_SONG_INFO,
    data
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})

export const isLoading = (flag) => ({
    type: actionTypes.LOADING,
    flag
})

export const setCurrentPlaylistId = (pId) => ({
    type: actionTypes.SET_CUR_PLAYLIST_ID,
    pId
})

export const setRecentSong = (song) => ({
    type: actionTypes.SET_RECENT_SONG,
    song
})

export const search = (keyword) => async (dispatch) => {
    try {
        const res = await apis.apiSearch(keyword);
        if (res.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: res.data.data,
                keyword
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}

export const getSearchSongs = (pId) => async (dispatch) => {
    try {
        const res = await apis.apiGetDetailPlaylist(pId);
        if (res.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: res.data.data.song.items,
            })
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null
        })
    }
}



