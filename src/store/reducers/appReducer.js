import actionTypes from '../actions/actionTypes';

const initialState = {
    homeData: [],
    banner: []
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME_START:
            state.homeData = [];
            state.banner = [];
            return {
                ...state,
            }
        case actionTypes.GET_HOME_SUCCESS:
            state.homeData = action.data;
            state.banner = action.data?.find(item => item.sectionType === 'banner').items || null;
            return {
                ...state,
            }
        case actionTypes.GET_HOME_FAIL:
            state.homeData = [];
            state.banner = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer