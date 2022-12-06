import actionTypes from '../actions/actionTypes';

const initialState = {
    curSongId: null,
    playing: false,
}


const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            state.curSongId = action.sId || null;
            return {
                ...state,
            }
        case actionTypes.PLAY:
            state.playing = action.flag;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default musicReducer