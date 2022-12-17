import actionTypes from '../actions/actionTypes';

const initialState = {
    curSongId: null,
    curPlaylistId: null,
    curSongInfo: null,
    isPlaying: false,
    atAlbum: false,
    songs: [],
    recentSongs: [],
    searchData: {},
    keyword: '',
}


const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            state.curSongId = action.sId || null;
            return {
                ...state,
            }
        case actionTypes.SET_CUR_SONG_INFO:
            state.curSongInfo = action.data || null;
            return {
                ...state,
            }
        case actionTypes.PLAY:
            state.isPlaying = action.flag;
            return {
                ...state,
            }
        case actionTypes.SET_ALBUM:
            state.atAlbum = action.flag;
            return {
                ...state,
            }
        case actionTypes.PLAYLIST:
            state.songs = action.songs;
            return {
                ...state,
            }
        case actionTypes.SET_CUR_PLAYLIST_ID:
            state.curPlaylistId = action.pId || null;
            return {
                ...state,
            }
        case actionTypes.SET_RECENT_SONG:
            let songs = state.recentSongs
            if (action.song) {
                let duplicate = songs.some(item => item.encodeId === action.song.encodeId);
                if (duplicate) {
                    songs = songs.filter((item) => item.encodeId !== action.song.encodeId)
                }
                if (songs.length > 19) {
                    songs = songs.filter((i, index, self) => index !== self.length - 1)
                }
                songs = [action.song, ...songs]
            }
            state.recentSongs = songs
            return {
                ...state,
            }
        case actionTypes.SEARCH:
            state.searchData = action.data;
            state.keyword = action.keyword;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default musicReducer