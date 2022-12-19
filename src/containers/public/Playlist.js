import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import * as apis from '../../apis';
import moment from 'moment'
import { AudioLoading, ListSong } from '../../components/index';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import icons from '../../utils/icons';

const { BsPlayFill } = icons

const Playlist = () => {

    const location = useLocation();
    const imageRef = useRef()
    const { pId } = useParams();
    const { isPlaying } = useSelector(state => state.music)
    const dispatch = useDispatch();
    const [playlistData, setPlaylistData] = useState(null)
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {

        dispatch(actions.setCurrentPlaylistId(pId))
        const fetchDetailPlaylist = async () => {
            dispatch(actions.isLoading(true))
            const res = await apis.apiGetDetailPlaylist(pId);
            if (res.data.err === 0) {
                dispatch(actions.isLoading(false))
                setPlaylistData(res.data?.data)
                dispatch(actions.setPlaylist(res.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()

    }, [pId])

    useEffect(() => {

        if (location?.state?.playAlbum && playlistData) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
            dispatch(actions.setCurrentSongId(playlistData?.song?.items[randomSong]?.encodeId));
            dispatch(actions.play(true))
        }

    }, [pId, playlistData])


    const handleHoverEnter = () => {
        setIsHover(true)
        imageRef.current.classList.add('animate-scale-up-image')
        imageRef.current.classList.remove('animate-scale-down-image')
    }

    const handleHoverLeave = () => {
        setIsHover(false)
        imageRef.current.classList.add('animate-scale-down-image')
        imageRef.current.classList.remove('animate-scale-up-image')
    }


    return (
        <div className='w-full h-full flex gap-8 px-[59px] items-start pt-[96px] animate-scale-up'>
            <div className='w-[300px] flex-none flex flex-col items-center gap-1 pb-1 justify-center'>
                <div className='w-full relative overflow-hidden'
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                >
                    <div className={`w-full overflow-hidden shadow-md ${isPlaying ? 'rounded-full animate-rotate-center' : 'animate-rotate-center-pause rounded-md'}`}>
                        <img
                            ref={imageRef}
                            src={playlistData?.thumbnailM}
                            alt="thumbnail"
                        />
                    </div>
                    {isPlaying && (
                        <span className='w-[50px] h-[50px] absolute top-[calc(50%-25px)] left-[calc(50%-25px)]  border border-white rounded-full flex items-center justify-center'>
                            <AudioLoading />
                        </span>
                    )}
                    {
                        !isPlaying && isHover && (
                            <div
                                className={`absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay rounded-md flex items-center justify-center hover:cursor-pointer ${isPlaying ? 'rounded-full' : ''}`}
                            >
                                <span className='w-[50px] h-[50px] border border-white rounded-full flex items-center justify-center'>
                                    <span
                                        className='text-white'
                                    // onClick={() => dispatch(actions.play(true))}
                                    >
                                        <BsPlayFill size={30} />
                                    </span>
                                </span>
                            </div>
                        )
                    }
                </div>
                <h3 className='text-[20px] font-bold mt-2 text-gray-800 text-center'>{playlistData?.title}</h3>
                <span className='flex gap-2 items-center text-gray-500 text-xs'>
                    <span>Cập nhật:</span>
                    <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                </span>
                <span className='text-gray-500 text-xs text-center'>
                    {playlistData?.artistsNames}
                </span>
                <span className='text-gray-500 text-xs'>
                    {`${Math.round(playlistData?.like / 1000)}`}k người yêu thích
                </span>
            </div>
            <Scrollbars style={{ width: "100%", height: "100%" }} autoHide >
                <div className='w-full flex-auto mb-10'>
                    <span className='text-sm'>
                        <span className='text-gray-600 mr-1'>Lời tựa</span>
                        <span>{playlistData?.sortDescription}</span>
                    </span>
                    <div>
                        <ListSong totalDuration={playlistData?.song?.totalDuration} isHideNote={false} />
                    </div>
                </div>
            </Scrollbars>
        </div >
    )
}

export default Playlist