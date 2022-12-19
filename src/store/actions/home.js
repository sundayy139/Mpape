import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getHomeStart = () => {
    return async (dispatch) => {
        try {
            const res = await apis.getHomeService()

            dispatch({
                type: actionTypes.GET_HOME_START
            })

            if (res?.data.err === 0) {
                dispatch(getHomeSuccess(res?.data.data.items))
            } else {
                dispatch(getHomeFail())
            }
        } catch (error) {
            dispatch(getHomeFail())
        }
    }
}

export const getHomeSuccess = (data) => ({
    type: actionTypes.GET_HOME_SUCCESS,
    data: data
})

export const getHomeFail = () => ({
    type: actionTypes.GET_HOME_FAIL
})

export const isLoading = (flag) => ({
    type: actionTypes.LOADING,
    flag
})

export const isScroll = (flag) => ({
    type: actionTypes.SCROLL,
    flag
})

