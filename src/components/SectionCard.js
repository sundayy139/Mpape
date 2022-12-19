import React, { memo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../utils/icons';

const { AiOutlineHeart, BsPlayFill, BsThreeDots } = icons


const SectionCard = ({ data, isHideDesc, isHideArtist }) => {

    const navigate = useNavigate();
    const imageRef = useRef()

    const [isHover, setIsHover] = useState(false);

    const handleClickCard = (data) => {
        const albumPath = data?.link.split('.')[0]
        navigate(albumPath,
            { state: { playAlbum: false } }
        )
    }

    const handleClickBtnCard = (e, data) => {
        e.stopPropagation();
        const albumPath = data?.link.split('.')[0]
        navigate(albumPath,
            { state: { playAlbum: true } }
        )
    }

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
        <div
            key={data.encodeId}
            className='flex flex-col gap-3 w-full text-sm cursor-pointer relative'
        >
            <div
                className='w-full relative rounded-md overflow-hidden'
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
                onClick={() => handleClickCard(data)}
            >
                <img
                    ref={imageRef}
                    src={data.thumbnailM}
                    className="w-full h-auto object-cover rounded-md"
                />
                {
                    isHover && (
                        <div className='absolute top-0 left-0 right-0 bottom-0 rounded-md flex bg-overlay text-white items-center justify-center gap-12'>
                            <span>
                                <AiOutlineHeart size={20} />
                            </span>
                            <span
                                className='p-1 border border-white rounded-full z-10'
                                onClick={(e) => handleClickBtnCard(e, data)}
                            >
                                <BsPlayFill size={35} />
                            </span>
                            <span>
                                <BsThreeDots size={20} />
                            </span>
                        </div>
                    )
                }

            </div>
            <span className='flex flex-col w-full'>
                <div className='w-full whitespace-nowrap text-ellipsis overflow-hidden'>
                    <span
                        className='font-semibold mb-1 hover:text-main-500'
                        onClick={() => handleClickCard(data)}
                    >
                        {data?.title}
                    </span>
                </div>
                {
                    !isHideDesc && (
                        <div className='w-full whitespace-nowrap text-ellipsis overflow-hidden'>
                            <span>{data?.sortDescription?.length > 30 ? `${data?.sortDescription.slice(0, 30)}...` : data?.sortDescription}</span>
                        </div>
                    )
                }
                <div>
                    {

                        !isHideArtist && data?.artists?.map(item => (
                            <Link
                                to={item.link}
                                key={item.id}
                                className='text-[#696969] w-full hover:text-main-500 hover:underline'
                            >
                                {item === data.artists[data.artists.length - 1] ? item.name : `${item.name}, `}
                            </Link>
                        ))
                    }
                </div>
                {
                    data.releaseDateText && (
                        <span className='opacity-70'>
                            {
                                data.releaseDateText
                            }
                        </span>
                    )
                }
            </span>
        </div>
    )
}

export default memo(SectionCard)