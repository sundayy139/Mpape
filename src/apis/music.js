import axios from "../axios";

export const getSong = (sId) => {
    return axios.get(`/song?id=${sId}`)
}

export const getDetailSong = (sId) => {
    return axios.get(`/infosong?id=${sId}`)
}