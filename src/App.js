import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { Home, WeekRank, Public, Playlist, ZingChart, Search, SearchSong, SearchAll, Singer, SearchPlaylist, SearchArtist } from './containers/public/index';
import path from './utils/path';

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Playlist />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Playlist />} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.STAR} element={<Home />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.SONG} element={<SearchSong />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
              <Route path={path.ARTIST_SEARCH} element={<SearchArtist />} />
              <Route path={path.ALL} element={<SearchAll />} />
            </Route>
            <Route path={path.HOME__SINGER} element={<Singer />} />
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
