import axios from "../axios";

export const getHomeService = () => {
    return axios.get("/home")
}