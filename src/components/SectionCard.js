import React, { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../utils/icons';

const { AiOutlineHeart, BsPlayFill, BsThreeDots } = icons


const SectionCard = ({ data }) => {

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
            className='flex flex-col gap-3 w-[20%] flex-auto text-sm cursor-pointer relative'
            onClick={() => handleClickCard(data)}
        >
            <div
                className='relative rounded-md overflow-hidden'
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
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
            <span className='flex flex-col'>
                <span className='font-semibold'>
                    {data?.title?.length >= 40 ? `${data?.title.slice(0, 30)}...` : data?.title}
                </span>
                {
                    data.sectionId === 'h100' ? (
                        <span>
                            {
                                data.artistsNames
                            }
                        </span>
                    ) : (
                        <span>{data?.sortDescription?.length > 30 ? `${data?.sortDescription.slice(0, 30)}...` : data?.sortDescription}</span>
                    )
                }
            </span>
        </div>
    )
}

export default memo(SectionCard)