import axios from "../axios";

export const apiGetSong = (sId) => {
    return axios.get(`/song?id=${sId}`)
}

export const apiGetDetailSong = (sId) => {
    return axios.get(`/infosong?id=${sId}`)
}

export const apiGetDetailPlaylist = (pId) => {
    return axios.get(`/detailplaylist?id=${pId}`)
}

export const apiSearch = (keyword) => {
    return axios.get(`/search?keyword=${keyword}`)
}

export const apiGetArtistSongs = (singerId) => {
    return axios.get(`/artistsong?id=${singerId}`)
}