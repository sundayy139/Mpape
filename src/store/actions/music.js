import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurrentSongId = (sId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sId
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})


