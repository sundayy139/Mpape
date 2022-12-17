import actionTypes from '../actions/actionTypes';

const initialState = {
    homeData: null,
    banner: null,
    autoTheme1: null,
    autoTheme2: null,
    top100: null,
    xone: null,
    newMusic: null,
    newRelease: null,
    weekChart: null,
    favoriteArtist: null,
    chart: null,
    rank: null,
    singer: null,
    isLoading: false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME_START:
            state.homeData = [];
            state.banner = [];
            state.autoTheme1 = {};
            state.autoTheme2 = {};
            state.top100 = {};
            state.xone = {};
            state.newMusic = {};
            state.newRelease = {};
            state.weekChart = [];
            state.favoriteArtist = {};
            state.chart = {};
            state.rank = [];
            state.singer = {};

            return {
                ...state,
            }
        case actionTypes.GET_HOME_SUCCESS:
            state.homeData = action.data;
            state.banner = action.data?.find(item => item.sectionId === 'hSlider').items || null;
            state.autoTheme1 = action.data?.find(item => item.sectionId === 'hAutoTheme1') || null;
            state.autoTheme2 = action.data?.find(item => item.sectionId === 'hAutoTheme2') || null;
            state.top100 = action.data?.find(item => item.sectionId === 'h100') || null;
            state.xone = action.data?.find(item => item.sectionId === 'hXone') || null;
            state.newMusic = { ...action.data?.find(item => item.sectionId === 'hAlbum'), title: "Nhạc mới" } || null;
            state.newRelease = action.data?.find(item => item.sectionType === 'new-release') || null;
            state.weekChart = action.data?.find(item => item.sectionType === 'weekChart')?.items || null;
            state.favoriteArtist = action.data?.find(item => item.sectionId === 'hMix') || null;
            state.chart = action.data?.find(item => item.sectionId === 'hZC')?.chart || null;
            state.rank = action.data?.find(item => item.sectionId === 'hZC')?.items || null;
            state.singer = action.data?.find(item => item.sectionType === 'artistSpotlight')?.items || null;

            return {
                ...state,
            }
        case actionTypes.GET_HOME_FAIL:
            state.homeData = [];
            state.banner = [];
            state.autoTheme1 = {};
            state.autoTheme2 = {};
            state.top100 = {};
            state.xone = {};
            state.newMusic = {};
            state.newRelease = {};
            state.weekChart = [];
            state.favoriteArtist = {};
            state.chart = {};
            state.rank = [];
            state.singer = {};

            return {
                ...state,
            }

        case actionTypes.LOADING:
            state.isLoading = action.flag;
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer