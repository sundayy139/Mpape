import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { Home, WeekRank, Public, Playlist, ZingChart, Search, SearchSong, SearchAll, Singer, SearchPlaylist, SearchArtist, NotFound } from './containers/public/index';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from './store/actions';
import * as apis from './apis/index';

function App() {
  const dispatch = useDispatch();

  const [weekData, setWeekData] = useState(null)
  useEffect(() => {
    dispatch(actions.getHomeStart())

    const fetchChart = async () => {
      const res = await apis.apiGetChartHome();
      if (res.data.err === 0) {
        setWeekData(res.data.data.weekChart)
      };
    }
    fetchChart()
  }, [])

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Playlist />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Playlist />} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank weekData={weekData && Object.values(weekData)} />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.STAR} element={<Home />} />
            <Route path={path.MY_MUSIC} element={<NotFound />} />
            <Route path={path.FOLLOW} element={<NotFound />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.SONG} element={<SearchSong />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
              <Route path={path.ARTIST_SEARCH} element={<SearchArtist />} />
              <Route path={path.ALL} element={<SearchAll />} />
            </Route>
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
